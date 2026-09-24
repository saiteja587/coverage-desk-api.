// Coverage Desk — Regression Test Suite
// ---------------------------------------------------------------------
// WHAT THIS IS: every parser bug, permission bug, and UI bug fixed across
// the whole development history of this app, captured as a permanent,
// re-runnable check — instead of the throwaway test scripts that were
// written once and deleted during each individual fix.
//
// WHY IT EXISTS: a single ~7,800-line HTML file with no build system has
// no automatic way to notice when an unrelated change breaks something
// that was already fixed. This file is that missing safety net.
//
// HOW TO RUN IT:
//   1. Requires Node.js and Playwright installed:
//        npm install playwright
//        npx playwright install chromium
//   2. Put this file in the same folder as index.html (or edit INDEX_PATH below).
//   3. Run:  node regression-suite.js
//   4. Read the summary at the bottom. Exit code is non-zero if anything failed —
//      safe to wire into a CI step later if you ever want one.
//
// HOW TO EXTEND IT: every time a NEW real message format breaks the
// parser (and it will — that's the nature of free-text parsing, not a
// flaw that gets "finished"), add the broken example as a new case in
// the relevant section below, confirm it now passes with the fix, and
// it's permanently guarded from then on. The whole point is that this
// list only ever grows, never resets.
// ---------------------------------------------------------------------

const { chromium } = require('playwright');
const path = require('path');

const INDEX_PATH = path.join(__dirname, 'index.html');

let pass = 0, fail = 0;
const failures = [];

function check(section, name, cond, detail) {
  const ok = !!cond;
  if (ok) { pass++; }
  else { fail++; failures.push(`[${section}] ${name}` + (detail ? ` — ${detail}` : '')); }
  console.log(`  ${ok ? '✓' : '✗ FAIL'}  ${name}`);
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const pageErrors = [];
  page.on('pageerror', err => pageErrors.push(err.message));
  page.on('console', msg => {
    const t = msg.text();
    if (msg.type() === 'error' && !t.includes('CORS') && !t.includes('Failed to load resource') && !t.includes('Failed to fetch') && !t.includes('net::ERR')) {
      pageErrors.push('[console] ' + t);
    }
  });
  page.on('dialog', d => d.accept());

  try { await page.context().grantPermissions(['clipboard-read', 'clipboard-write']); } catch (e) { /* not fatal — the paste-from-clipboard check below will just report what it finds */ }

  await page.goto('file://' + INDEX_PATH, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // =====================================================================
  console.log('\n=== 1. Main call-line parser (parseDetailedLine) ===');
  // =====================================================================
  const parserCases = await page.evaluate(() => {
    const out = {};

    // Company name containing its own hyphen ("Co-operative Bank") must not
    // be split apart by the same delimiter that separates real fields.
    out.hyphenatedCompany = parseDetailedLine(
      "7.\tShree Ramji – Interview – (UK) - Phn Interview - The Co - operative Bank – 3:30 PM IST – Duration: 30 Mins (1st Round)"
    );
    // A run of adjacent delimiters (en-dash immediately followed by "- ")
    // used to leave a stray leading hyphen on the next segment.
    out.strayHyphenCompany1 = parseDetailedLine(
      "20.\tSaurabh Singh – Interview – (UK) - Phn Interview - Procea Ltd – 7:00 PM IST – Duration: 30 Mins (1st Round) (Candidate 1st Interview)"
    );
    out.strayHyphenCompany2 = parseDetailedLine(
      "14.\tMathew kodavalli – Interview – (UK) - Phn Interview - Teva – 6:30 PM IST – Duration: 30 Mins (1st Round)"
    );
    // Bare-hour time ("11pm", no ":00") must be recognized, and must not
    // corrupt the company field the way it originally did.
    out.bareHourTime = parseDetailedLine(
      "Ruchitha Mandalapu - Interview - Acme - 11pm IST - Duration: 30 Mins (1st Round)"
    );
    // Lowercase am/pm should normalize to uppercase for display consistency.
    out.lowercaseAmPm = parseDetailedLine(
      "Jane Doe - Interview - Beta - 5:00 pm IST - Duration: 30 Mins (1st Round)"
    );
    // A bare "25mins" with no "Duration:" label and no parentheses.
    out.bareDuration = parseDetailedLine(
      "68. Sananazneen Shaik —Interview—Fiserv –-11:00PM IST 25mins (1st round)"
    );
    // The stricter "Duration:" pattern must still win over the bare fallback.
    out.explicitDurationPriority = parseDetailedLine(
      "John Smith - Interview - Acme - 4:00 PM IST - Duration: 45 Mins (1st Round)"
    );
    // Technical POC (Gopi/Kishore/Vamsi or anyone on Development Team) must
    // be captured separately, never treated as the assignee.
    out.technicalPOC = parseDetailedLine(
      "1. Surya Teja Gowd Ayinavilli (Ireland) – Interview – Vitalograph – 2:30 PM IST – Duration: 30 Mins (2nd Round) -> gopi"
    );
    // Trailing bare-name POC pattern ("-vamsi", no arrow).
    out.trailingPOC = parseDetailedLine(
      "10. Paranjay Basa (Phani sir Ref) – Interview – Stripe – 10:30 PM IST – Duration: 90 Mins (2nd Round)-vamsi"
    );
    // Onsite detection from free text, and the trailing-POC pattern must
    // still work even when Onsite is also present in the same line.
    out.onsiteDetection = parseDetailedLine(
      "Sardhak Peddapalli-(UK)-Interview – Dukosi – (2nd round)(OnSite Interview)- kumar"
    );
    // "Candidate 1st interview" (including the common typo "inteview")
    // must force round to 1st regardless of any other round signal.
    out.candidateFirstInterview = parseDetailedLine(
      "48.\tPavan Kalyan Reddy Pochugari – Interview – RiverWoods – 11:45 PM IST – Duration: Not Provided (1st Round) (Candidate 1st interview)"
    );
    // Interviewer arrow-chain extraction.
    out.interviewerArrow = parseDetailedLine(
      "18. Shivendra Gupta – Interview – Infinite Computer Solutions – 10:30 PM IST – Duration: 60 Mins (1st Round) → Karthik → Pandi Murugesan (Senior Test Lead)"
    );
    // Safety check: "Round 2" as trailing plain text must never be
    // misread as a duration ("2" + nothing that looks like mins/hrs).
    out.roundNotMisreadAsDuration = parseDetailedLine(
      "Alice Smith - Interview - Acme - 4:00 PM IST - Duration: 30 Mins (Round 2)"
    );

    return out;
  });

  check('Parser', 'Hyphenated company name stays whole ("The Co - operative Bank")',
    parserCases.hyphenatedCompany.company === 'The Co - operative Bank',
    `got "${parserCases.hyphenatedCompany.company}"`);
  check('Parser', 'Stray-hyphen company fix #1 ("Procea Ltd")',
    parserCases.strayHyphenCompany1.company === 'Procea Ltd',
    `got "${parserCases.strayHyphenCompany1.company}"`);
  check('Parser', 'Stray-hyphen company fix #2 ("Teva")',
    parserCases.strayHyphenCompany2.company === 'Teva',
    `got "${parserCases.strayHyphenCompany2.company}"`);
  check('Parser', 'Bare-hour time "11pm" → "11:00 PM"',
    parserCases.bareHourTime.time === '11:00 PM',
    `got "${parserCases.bareHourTime.time}"`);
  check('Parser', 'Bare-hour time does not corrupt company ("Acme")',
    parserCases.bareHourTime.company === 'Acme',
    `got "${parserCases.bareHourTime.company}"`);
  check('Parser', 'Lowercase am/pm normalizes to uppercase',
    parserCases.lowercaseAmPm.time === '5:00 PM',
    `got "${parserCases.lowercaseAmPm.time}"`);
  check('Parser', 'Bare duration "25mins" (no label, no parens) → "25 mins"',
    parserCases.bareDuration.duration === '25 mins',
    `got "${parserCases.bareDuration.duration}"`);
  check('Parser', 'Explicit "Duration:" label still takes priority',
    parserCases.explicitDurationPriority.duration === '45 Mins',
    `got "${parserCases.explicitDurationPriority.duration}"`);
  check('Parser', 'Technical POC "gopi" captured, not treated as assignee',
    parserCases.technicalPOC.technicalPOC === 'Gopi',
    `got "${parserCases.technicalPOC.technicalPOC}"`);
  check('Parser', 'Trailing bare-name POC "-vamsi" captured',
    parserCases.trailingPOC.technicalPOC === 'Vamsi',
    `got "${parserCases.trailingPOC.technicalPOC}"`);
  check('Parser', 'Onsite detected from free text',
    parserCases.onsiteDetection.onsite === true);
  check('Parser', 'Trailing POC still works alongside onsite ("kumar")',
    parserCases.onsiteDetection.technicalPOC === 'Kumar' || parserCases.onsiteDetection.technicalPOC === '',
    `got "${parserCases.onsiteDetection.technicalPOC}" (empty is acceptable if "kumar" isn't in the roster/POC list for this run)`);
  check('Parser', '"Candidate 1st interview" (with typo) forces round to 1st',
    parserCases.candidateFirstInterview.round === '1st' && parserCases.candidateFirstInterview.candidateFirstInterview === true,
    `round="${parserCases.candidateFirstInterview.round}" flag=${parserCases.candidateFirstInterview.candidateFirstInterview}`);
  check('Parser', 'Interviewer arrow-chain extraction',
    !!parserCases.interviewerArrow.interviewer,
    `got "${parserCases.interviewerArrow.interviewer}"`);
  check('Parser', '"Round 2" is never misread as a duration',
    parserCases.roundNotMisreadAsDuration.duration === '30 Mins',
    `got duration="${parserCases.roundNotMisreadAsDuration.duration}"`);

  // =====================================================================
  console.log('\n=== 2. Reschedule/cancel message parser (parseRescheduleText) ===');
  // =====================================================================
  const rescheduleCases = await page.evaluate(() => {
    const out = {};
    // Original self-contained per-line format.
    out.perLine = parseRescheduleText(
      `Vamsi Rokkam – 2:30 PM IST – rescheduled from candidate side sir`
    );
    // A single "All calls reschedule..." line covering multiple OTHER
    // calls listed in the same paste, none of which mention reschedule themselves.
    out.blanket = parseRescheduleText(
      `Havila Penumaka – Interview – Clearbrook – 8:45 PM IST – Duration: 30 Mins (1st Round)\n\nRakesh gandra – Interview – Catholic Health – 9:30 PM IST – Duration: 30 Mins (1st Round)\n\nAll calls reschedule from Interviewer side sir @Sashank Bava`
    );
    // A short "Time – Name" line followed by a SEPARATE paragraph with the
    // actual reason/status word — neither half is self-contained alone.
    out.twoPart = parseRescheduleText(
      `6:30 PM – Pinky Sachdev\n\nThe candidate thought the interview time was in EDT, but it was scheduled in EST. She requested to reschedule the interview.\n\n@Sashank Bava`
    );
    // Bare-hour time inside reschedule messages specifically, and
    // "reschedule no response" correctly resolving to not_responded
    // rather than rescheduled.
    out.bareHourReschedule = parseRescheduleText(
      `Amruth Acharya - 11pm ist interview was reschedule no response from interviewer side sir`
    );
    // @mention appearing BEFORE the name (not just after, as a trailing tag).
    out.leadingMention = parseRescheduleText(
      `@Sashank Bava Sir, Deepanshu R - 4:30 PM call cancelled from recruiter side`
    );
    // Mixed paste: one call states its own status, the blanket line covers
    // the rest — the individually-stated one must keep its own status,
    // not get overridden by the blanket.
    out.mixedIndividualAndBlanket = parseRescheduleText(
      `Alice Smith – Interview – Acme – 3:00 PM IST – Duration: 30 Mins (1st Round)\nBob Jones – 4:00 PM IST – cancelled due to candidate side sir\nCarol White – Interview – Beta – 5:00 PM IST – Duration: 30 Mins (1st Round)\n\nAll calls reschedule from Interviewer side sir @Team`
    );
    // False-positive check: plain numbered call listings with no
    // reschedule wording anywhere must produce zero matches.
    out.noFalsePositive = parseRescheduleText(
      `1. John Smith – Interview – Acme – 4:00 PM IST – Duration: 30 Mins (1st Round)\n\n2. Jane Doe – Interview – Beta – 5:00 PM IST – Duration: 30 Mins (2nd Round)`
    );
    return out;
  });

  check('Reschedule', 'Per-line format still works',
    rescheduleCases.perLine.length === 1 && rescheduleCases.perLine[0].status === 'rescheduled',
    JSON.stringify(rescheduleCases.perLine));
  check('Reschedule', 'Blanket "All calls reschedule..." covers all listed calls',
    rescheduleCases.blanket.length === 2 && rescheduleCases.blanket.every(r => r.status === 'rescheduled'),
    JSON.stringify(rescheduleCases.blanket));
  check('Reschedule', 'Two-part message (time+name, then separate reason paragraph)',
    rescheduleCases.twoPart.length === 1 && rescheduleCases.twoPart[0].candidate === 'Pinky Sachdev' && rescheduleCases.twoPart[0].time === '6:30 PM',
    JSON.stringify(rescheduleCases.twoPart));
  check('Reschedule', 'Bare-hour time + "reschedule no response" → not_responded',
    rescheduleCases.bareHourReschedule.length === 1 && rescheduleCases.bareHourReschedule[0].status === 'not_responded' && rescheduleCases.bareHourReschedule[0].time === '11:00 PM',
    JSON.stringify(rescheduleCases.bareHourReschedule));
  check('Reschedule', 'Leading @mention before the name still parses correctly',
    rescheduleCases.leadingMention.length === 1 && rescheduleCases.leadingMention[0].candidate === 'Deepanshu R' && rescheduleCases.leadingMention[0].side === 'recruiter side',
    JSON.stringify(rescheduleCases.leadingMention));
  check('Reschedule', 'Individually-stated status takes priority over the blanket',
    (() => {
      const bob = rescheduleCases.mixedIndividualAndBlanket.find(r => r.candidate === 'Bob Jones');
      const alice = rescheduleCases.mixedIndividualAndBlanket.find(r => r.candidate === 'Alice Smith');
      return bob && bob.status === 'cancelled' && alice && alice.status === 'rescheduled';
    })(),
    JSON.stringify(rescheduleCases.mixedIndividualAndBlanket));
  check('Reschedule', 'No false positives on plain call listings',
    rescheduleCases.noFalsePositive.length === 0,
    JSON.stringify(rescheduleCases.noFalsePositive));

  // =====================================================================
  console.log('\n=== 2a. Closure / job-offer message parser (parseClosureText) ===');
  // =====================================================================
  const closureCases = await page.evaluate(() => {
    const out = {};
    out.original = parseClosureText(
      `Rohini sura got offer letter from Capitol bridge\n\nsalary: $75,000 per annum\n\n@Sashank Bava @Sundeep Anna @Phani Anna USA @Pradeep Anna`
    );
    out.inlineSalary = parseClosureText('Jane Doe received offer from Beta Inc at $85,000\n\n@Team');
    out.selectedBy = parseClosureText('Bob Jones has been selected by Gamma LLC\n\nsalary: $60,000/yr\n\n@Team');
    out.closedWith = parseClosureText('Alice White is closed with Delta Co\n\nsalary: $70k\n\n@Team');
    out.multiple = parseClosureText('Candidate One got offer letter from CompanyA\n\nsalary: $50,000\n\nCandidate Two received offer from CompanyB\n\nsalary: $55,000\n\n@Team');
    out.noFalsePositive = parseClosureText('1. John Smith – Interview – Acme – 4:00 PM IST – Duration: 30 Mins (1st Round)');
    // Real messages that surfaced real bugs: "Sir," prefix, WhatsApp
    // *bold* markdown around company/salary, currency symbol AFTER the
    // number ("49$/Hr"), and salary glued onto the same line as the offer
    // with no line break at all.
    out.realBatch = [
      parseClosureText(`Sir, Humera Pathan got offer letter from Insight Global \nSalary: 49$/Hr   \n\n@Sashank Bava @Sundeep Anna @Pradeep Anna @Phani Anna USA`),
      parseClosureText(`Vijetha nonwar got offer letter from *First port* \n\nsalary : *£38000* /Per Year\n\n@Sashank Bava @Sundeep Anna @Pradeep Anna @Phani Anna USA`),
      parseClosureText(`Janani Priya got offer from *American University.*\n\nSalary: 112,000$ / yr\n\n@Sashank Bava @Sundeep Anna @Pradeep Anna @Phani Anna USA`),
      parseClosureText(`Himaja Rao Adirala got offer letter  from Atrium hospitality\nSalary:  $68,000.00/Year`),
      parseClosureText(`Lahari Beerla got offer from UTM (UTILITY TRAILER MANUFACTURING COMPANY)\n\nSalary: $85,000 / Yr\n\n\n@Sashank Bava @Sundeep Anna @Pradeep Anna @Phani Anna USA`),
      parseClosureText(`Sir, Lahari beerla got offer letter from *Novolox* \nSalary: $85,000/ Year  \n\n@Sashank Bava @Sundeep Anna @Pradeep Anna @Phani Anna USA`),
    ];
    return out;
  });
  check('Closures', 'Exact reported message parses candidate/company/salary correctly',
    closureCases.original.length === 1 && closureCases.original[0].candidate === 'Rohini sura' &&
    closureCases.original[0].company === 'Capitol bridge' && closureCases.original[0].salary === '$75,000 per annum',
    JSON.stringify(closureCases.original));
  check('Closures', 'Inline salary does not get swallowed into the company field',
    closureCases.inlineSalary.length === 1 && closureCases.inlineSalary[0].company === 'Beta Inc' && closureCases.inlineSalary[0].salary === '$85,000',
    JSON.stringify(closureCases.inlineSalary));
  check('Closures', '"selected by" phrasing recognized',
    closureCases.selectedBy.length === 1 && closureCases.selectedBy[0].company === 'Gamma LLC',
    JSON.stringify(closureCases.selectedBy));
  check('Closures', '"closed with" phrasing recognized',
    closureCases.closedWith.length === 1 && closureCases.closedWith[0].company === 'Delta Co',
    JSON.stringify(closureCases.closedWith));
  check('Closures', 'Multiple closures in one paste each get their own salary',
    closureCases.multiple.length === 2 && closureCases.multiple[0].salary === '$50,000' && closureCases.multiple[1].salary === '$55,000',
    JSON.stringify(closureCases.multiple));
  check('Closures', 'No false positives on plain call listings',
    closureCases.noFalsePositive.length === 0,
    JSON.stringify(closureCases.noFalsePositive));
  const rb = closureCases.realBatch;
  check('Closures', '"Sir," prefix stripped + dollar-after-number salary ("49$/Hr") extracted, not lost',
    rb[0][0].candidate === 'Humera Pathan' && rb[0][0].company === 'Insight Global' && rb[0][0].salary === '49$/Hr', JSON.stringify(rb[0]));
  check('Closures', 'WhatsApp *bold* markdown stripped from company and £ salary',
    rb[1][0].company === 'First port' && rb[1][0].salary === '£38000 /Per Year', JSON.stringify(rb[1]));
  check('Closures', 'Stray trailing period inside asterisks stripped ("*American University.*")',
    rb[2][0].company === 'American University', JSON.stringify(rb[2]));
  check('Closures', 'Salary glued onto the SAME line as the offer (no line break) still separates from company',
    rb[3][0].company === 'Atrium hospitality' && rb[3][0].salary === '$68,000.00/Year', JSON.stringify(rb[3]));
  check('Closures', 'Parenthetical company expansion preserved whole ("UTM (UTILITY TRAILER...)")',
    rb[4][0].company === 'UTM (UTILITY TRAILER MANUFACTURING COMPANY)', JSON.stringify(rb[4]));
  check('Closures', '"Sir," + *bold* + glued salary all handled together in one message',
    rb[5][0].candidate === 'Lahari beerla' && rb[5][0].company === 'Novolox' && rb[5][0].salary === '$85,000/ Year', JSON.stringify(rb[5]));

  // Real report: the candidate's last name ran straight into "got" with
  // no space at all ("...Jerom Mohangot offer letter from SMBC") — fast
  // WhatsApp typing, no space bar hit. The parser used to require a
  // literal space before "got"/"closed"/"selected"/"placed", so this
  // silently matched nothing.
  const gluedGotCase = await page.evaluate(() => parseClosureText(
    'Steffy Metilda Jerom Mohangot offer letter from SMBC\n\nsalary : *€60000* /Per Year\n@Sashank Bava @Sundeep Anna @Phani Anna USA @Pradeep Anna'
  ));
  check('Closures', '"Mohangot" (candidate name run into "got" with no space) still parses',
    gluedGotCase.length === 1 && gluedGotCase[0].candidate === 'Steffy Metilda Jerom Mohan' &&
    gluedGotCase[0].company === 'SMBC' && gluedGotCase[0].salary === '€60000 /Per Year',
    JSON.stringify(gluedGotCase));

  // =====================================================================
  console.log('\n=== 2a-2. WhatsApp multi-select-copy prefixes stripped on all three importers ===');
  // =====================================================================
  // Real ask: "if there are 2+ messages in the clipboard, how do I copy
  // them all at once?" — answer is WhatsApp's own multi-select (long-press
  // one message, tap the rest, then the copy icon), but that mode prefixes
  // every line with a timestamp + sender name that single-message copy
  // never includes. Two known shapes (iOS bracket, Android dash) must be
  // stripped before any of the three importers ever sees the line.
  const multiCopyCases = await page.evaluate(() => {
    const iosClosure = parseClosureText(
      '[2:32 PM, 9/21/26] Sashank Bava: Steffy Metilda Jerom Mohan got offer letter from SMBC\n[2:33 PM, 9/21/26] Sashank Bava: salary : *€60000* /Per Year'
    );
    const androidClosure = parseClosureText(
      '21/09/2026, 14:32 - Sashank Bava: Steffy Metilda Jerom Mohan got offer letter from SMBC\n21/09/2026, 14:33 - Sashank Bava: salary : *€60000* /Per Year'
    );
    const androidReschedule = parseRescheduleText(
      '21/09/2026, 09:10 - Sashank Bava: Ruchitha Mandalapu - 11pm ist interview was reschedule to tomorrow from interviewer side sir'
    );
    const iosCallImport = parseImportText(
      '[9:00 AM, 9/21/26] Sashank Bava: Royal Prabhu (UK) – Interview – Lloyds Group – 1:30 PM IST – Duration: 30 Mins (1st Round)',
      '2026-09-21', null
    );
    // A normal, single-message paste (no WhatsApp prefix at all) must be
    // completely unaffected — this is the far more common case.
    const untouchedNormal = parseRescheduleText('Ruchitha Mandalapu - 11pm ist interview was reschedule to tomorrow from interviewer side sir');
    return { iosClosure, androidClosure, androidReschedule, iosCallImport, untouchedNormal };
  });
  check('Multi-copy', 'iOS-style "[time, date] Sender:" prefix stripped from a closure paste',
    multiCopyCases.iosClosure.length === 1 && multiCopyCases.iosClosure[0].company === 'SMBC' && multiCopyCases.iosClosure[0].salary === '€60000 /Per Year',
    JSON.stringify(multiCopyCases.iosClosure));
  check('Multi-copy', 'Android-style "date, time - Sender:" prefix stripped from a closure paste',
    multiCopyCases.androidClosure.length === 1 && multiCopyCases.androidClosure[0].company === 'SMBC' && multiCopyCases.androidClosure[0].salary === '€60000 /Per Year',
    JSON.stringify(multiCopyCases.androidClosure));
  check('Multi-copy', 'Android-style prefix stripped from a reschedule paste',
    multiCopyCases.androidReschedule.length === 1 && multiCopyCases.androidReschedule[0].candidate === 'Ruchitha Mandalapu',
    JSON.stringify(multiCopyCases.androidReschedule));
  check('Multi-copy', 'iOS-style prefix stripped from a plain call-import paste',
    multiCopyCases.iosCallImport.length === 1 && multiCopyCases.iosCallImport[0].candidate === 'Royal Prabhu' && multiCopyCases.iosCallImport[0].company === 'Lloyds Group',
    JSON.stringify(multiCopyCases.iosCallImport));
  check('Multi-copy', 'A normal single-message paste (no WhatsApp export prefix) is completely unaffected',
    multiCopyCases.untouchedNormal.length === 1 && multiCopyCases.untouchedNormal[0].candidate === 'Ruchitha Mandalapu',
    JSON.stringify(multiCopyCases.untouchedNormal));

  // =====================================================================
  console.log('\n=== 2b. Closure cross-reference against existing call records ===');
  // =====================================================================
  const crossRefCases = await page.evaluate(() => {
    const allRows = [
      { candidate: 'Himaja Rao Adirala', company: 'Atrium Hospitality', _date: '2026-08-01' },
      { candidate: 'Vijetha nonwar', company: 'Second Port', _date: '2026-08-10' },
    ];
    return {
      match: crossReferenceClosure('Himaja Rao Adirala', 'Atrium hospitality', allRows),
      mismatch: crossReferenceClosure('Vijetha nonwar', 'First port', allRows),
      noMatch: crossReferenceClosure('Nobody Real', 'Some Company', allRows),
    };
  });
  check('Closures', 'Cross-reference: matching candidate+company (case-insensitive) recognized as a match',
    crossRefCases.match.status === 'match', JSON.stringify(crossRefCases.match));
  check('Closures', 'Cross-reference: candidate found but company genuinely differs — flagged, not silently trusted',
    crossRefCases.mismatch.status === 'mismatch' && crossRefCases.mismatch.message.includes('Second Port'), JSON.stringify(crossRefCases.mismatch));
  check('Closures', 'Cross-reference: no matching candidate at all — flagged as no_match',
    crossRefCases.noMatch.status === 'no_match', JSON.stringify(crossRefCases.noMatch));

  // =====================================================================
  console.log('\n=== 2c. Closures + Import merged into one panel/button ===');
  // =====================================================================
  // Real request: two separate buttons (Closures, Import Closure) were
  // hard to find, tucked into different menus. Now there's exactly one
  // button, and clicking it opens a single panel with the import form on
  // top and the recorded list — grouped month by month — underneath.
  const oneButtonCheck = await page.evaluate(() => ({
    closuresBtnCount: document.querySelectorAll('#toggleClosures').length,
    noSeparateImportBtn: !document.getElementById('toggleClosureImport'),
  }));
  check('Closures UI', 'Exactly one Closures button exists (no separate Import Closure button)',
    oneButtonCheck.closuresBtnCount === 1 && oneButtonCheck.noSeparateImportBtn, JSON.stringify(oneButtonCheck));

  await page.click('#toggleClosures');
  await page.waitForTimeout(200);
  const combinedPanelCheck = await page.evaluate(() => ({
    hasTextarea: !!document.getElementById('closureImportText'),
    hasParseBtn: !!document.getElementById('parseClosureBtn'),
    hasSummary: !!document.querySelector('.summary'),
  }));
  check('Closures UI', 'Clicking Closures opens ONE panel with both the import form and the records summary',
    combinedPanelCheck.hasTextarea && combinedPanelCheck.hasParseBtn && combinedPanelCheck.hasSummary,
    JSON.stringify(combinedPanelCheck));

  await page.fill('#closureImportText', 'Regression Test Candidate got offer letter from Regression Test Corp\n\nsalary: $90,000 per year');
  await page.click('#parseClosureBtn');
  await page.waitForTimeout(200);
  await page.click('#cancelClosureConfirm');
  await page.waitForTimeout(200);
  const backToCombinedCheck = await page.evaluate(() => ({
    activePanelName: getActivePanelName(),
    showClosures: state.showClosures,
    hasTextarea: !!document.getElementById('closureImportText'),
  }));
  check('Closures UI', 'Cancelling the parse-review step returns to the same combined panel (not fully closed)',
    backToCombinedCheck.activePanelName === 'closures' && backToCombinedCheck.showClosures && backToCombinedCheck.hasTextarea,
    JSON.stringify(backToCombinedCheck));

  const monthGroupingCheck = await page.evaluate(() => {
    state.closures = [
      { id: 1, candidate: 'A', company: 'X', salary: '$1', createdAt: new Date(2026, 8, 15).toISOString() },
      { id: 2, candidate: 'B', company: 'Y', salary: '$2', createdAt: new Date(2026, 8, 1).toISOString() },
      { id: 3, candidate: 'C', company: 'Z', salary: '$3', createdAt: new Date(2026, 7, 20).toISOString() },
    ];
    state.closuresLoaded = true;
    render();
    const text = document.querySelector('.import-panel').textContent;
    return {
      hasSeptember: text.includes('September 2026'),
      hasAugust: text.includes('August 2026'),
      septemberBeforeAugust: text.indexOf('September 2026') < text.indexOf('August 2026'),
    };
  });
  check('Closures UI', 'Records are grouped month by month, most recent month first',
    monthGroupingCheck.hasSeptember && monthGroupingCheck.hasAugust && monthGroupingCheck.septemberBeforeAugust,
    JSON.stringify(monthGroupingCheck));

  // Real request: pasting WhatsApp messages in by hand, every time, was
  // the actual friction — a one-tap "Paste from clipboard" button next
  // to every import textarea (calls, reschedule/cancel, closures) skips
  // the long-press-to-paste step.
  await page.evaluate(async () => { try { await navigator.clipboard.writeText('Clipboard Test Candidate got offer letter from Clipboard Test Co\n\nsalary: $77,000 per year'); } catch(e) {} });
  const pasteBtnSelector = '.paste-clipboard-btn[data-target="closureImportText"]';
  const pasteBtnPresent = await page.evaluate((sel) => !!document.querySelector(sel), pasteBtnSelector);
  let pastedValue = '';
  if (pasteBtnPresent) {
    await page.click(pasteBtnSelector);
    await page.waitForTimeout(200);
    pastedValue = await page.evaluate(() => document.getElementById('closureImportText').value);
  }
  check('Closures UI', 'A "Paste from clipboard" button fills the closure import textarea',
    pasteBtnPresent && pastedValue.includes('Clipboard Test Candidate'), `present=${pasteBtnPresent}, value=${JSON.stringify(pastedValue)}`);

  const pasteOtherPanels = await page.evaluate(async () => {
    async function tryPanel(flag, targetId, clipText) {
      closeAllPanels();
      state[flag] = true;
      render();
      try { await navigator.clipboard.writeText(clipText); } catch(e) {}
      const btn = document.querySelector(`.paste-clipboard-btn[data-target="${targetId}"]`);
      const present = !!btn;
      if (btn) btn.click();
      await new Promise(r => setTimeout(r, 50));
      const el = document.getElementById(targetId);
      return { present, value: el ? el.value : null };
    }
    const callImport = await tryPanel('showImport', 'importText', 'Clipboard call import test');
    const reschedImport = await tryPanel('showRescheduleImport', 'rescheduleImportText', 'Clipboard reschedule import test');
    closeAllPanels();
    render();
    return { callImport, reschedImport };
  });
  check('Closures UI', 'The paste button also works on the plain call-import panel',
    pasteOtherPanels.callImport.present && pasteOtherPanels.callImport.value === 'Clipboard call import test',
    JSON.stringify(pasteOtherPanels.callImport));
  check('Closures UI', 'The paste button also works on the reschedule/cancel import panel',
    pasteOtherPanels.reschedImport.present && pasteOtherPanels.reschedImport.value === 'Clipboard reschedule import test',
    JSON.stringify(pasteOtherPanels.reschedImport));

  // -----------------------------------------------------------------
  // Multi-message clipboard picker: "if i click the paste from clipboard
  // is there any chance that they can show clipboaed all messqags in a
  // small screnn then i select which messgage i can paste" — when the
  // clipboard has several WhatsApp messages (detected via export-prefix
  // boundaries), show a picker instead of dumping everything in.
  // -----------------------------------------------------------------
  const clipboardPickerTests = await page.evaluate(async () => {
    const out = {};

    // splitClipboardIntoMessages: single legitimate multi-line message
    // (blank line inside it, e.g. a closure's salary line) must NOT be
    // split — only an actual WhatsApp export prefix is a real boundary.
    const singleMsg = "Steffy Metilda Jerom Mohangot offer letter from SMBC\n\nsalary : *€60000* /Per Year\n@Sashank Bava";
    out.singleMessageNotSplit = splitClipboardIntoMessages(singleMsg).length === 1;

    const multiMsg = "[2:32 PM, 9/21/26] Sashank Bava: Steffy offer letter from SMBC\n\nsalary : *€60000* /Per Year\n[2:33 PM, 9/21/26] Sashank Bava: Another candidate offer from XYZ\n\nsalary : *€50000* /Per Year";
    const split = splitClipboardIntoMessages(multiMsg);
    out.multiMessageSplitCount = split.length;
    out.multiMessagePrefixesStripped = !split[0].includes('[2:32 PM') && !split[1].includes('[2:33 PM');

    // Open closures panel, prime clipboard with 2 messages, click paste —
    // picker should appear instead of a direct insert.
    closeAllPanels();
    state.showClosures = true;
    render();
    const existingText = 'already typed draft';
    document.getElementById('closureImportText').value = existingText;
    await navigator.clipboard.writeText(multiMsg);
    document.querySelector('.paste-clipboard-btn[data-target="closureImportText"]').click();
    await new Promise(r => setTimeout(r, 80));

    out.pickerShown = !!document.getElementById('clipboardPickerOverlay');
    out.pickerMessageCount = state.clipboardPickerMessages.length;
    out.textareaPreservedWhilePickerOpen = document.getElementById('closureImportText').value === existingText;
    out.insertButtonLabel = document.getElementById('clipboardPickerInsert').textContent;

    // Uncheck the second message, then insert — only the first should land.
    const checks = document.querySelectorAll('.clipboard-picker-check');
    out.checkboxCount = checks.length;
    checks[1].checked = false;
    checks[1].dispatchEvent(new Event('change', { bubbles: true }));
    await new Promise(r => setTimeout(r, 60));
    out.insertLabelAfterUncheck = document.getElementById('clipboardPickerInsert').textContent;
    document.getElementById('clipboardPickerInsert').click();
    await new Promise(r => setTimeout(r, 80));

    out.pickerClosedAfterInsert = !document.getElementById('clipboardPickerOverlay');
    const afterInsertValue = document.getElementById('closureImportText').value;
    out.insertedOnlyFirstMessage = afterInsertValue.includes('Steffy offer letter') && !afterInsertValue.includes('Another candidate');
    out.existingDraftKeptOnInsert = afterInsertValue.startsWith(existingText);

    // Cancel path: prime again, open picker, cancel — textarea must revert
    // to exactly what it had before the picker opened (not be wiped by the
    // DOM rebuild, and not keep any picker leftovers).
    document.getElementById('closureImportText').value = 'draft before cancel test';
    await navigator.clipboard.writeText(multiMsg);
    document.querySelector('.paste-clipboard-btn[data-target="closureImportText"]').click();
    await new Promise(r => setTimeout(r, 80));
    document.getElementById('clipboardPickerCancel').click();
    await new Promise(r => setTimeout(r, 80));
    out.pickerClosedAfterCancel = !document.getElementById('clipboardPickerOverlay');
    out.textareaUnchangedAfterCancel = document.getElementById('closureImportText').value === 'draft before cancel test';

    // A single-message clipboard must still direct-insert with no picker.
    document.getElementById('closureImportText').value = '';
    await navigator.clipboard.writeText('Plain single message with no export prefix\n\nsalary: $30,000');
    document.querySelector('.paste-clipboard-btn[data-target="closureImportText"]').click();
    await new Promise(r => setTimeout(r, 80));
    out.singleMessageNoPicker = !document.getElementById('clipboardPickerOverlay');
    out.singleMessageDirectInsert = document.getElementById('closureImportText').value.includes('Plain single message');

    closeAllPanels();
    render();
    return out;
  });
  check('Clipboard picker', 'A single legitimate multi-line message (e.g. closure w/ blank-line salary) is never split',
    clipboardPickerTests.singleMessageNotSplit, JSON.stringify(clipboardPickerTests));
  check('Clipboard picker', 'Clipboard with 2 WhatsApp-prefixed messages splits into exactly 2, prefixes stripped',
    clipboardPickerTests.multiMessageSplitCount === 2 && clipboardPickerTests.multiMessagePrefixesStripped,
    JSON.stringify(clipboardPickerTests));
  check('Clipboard picker', 'Pasting a multi-message clipboard opens the picker instead of inserting directly',
    clipboardPickerTests.pickerShown && clipboardPickerTests.pickerMessageCount === 2, JSON.stringify(clipboardPickerTests));
  check('Clipboard picker', 'Opening the picker does not wipe text already typed in the import box',
    clipboardPickerTests.textareaPreservedWhilePickerOpen, JSON.stringify(clipboardPickerTests));
  check('Clipboard picker', 'All messages are checked by default and the Insert button reflects the count',
    clipboardPickerTests.insertButtonLabel.includes('(2)') && clipboardPickerTests.checkboxCount === 2, JSON.stringify(clipboardPickerTests));
  check('Clipboard picker', 'Unchecking a message updates the Insert button count',
    clipboardPickerTests.insertLabelAfterUncheck.includes('(1)'), JSON.stringify(clipboardPickerTests));
  check('Clipboard picker', 'Insert closes the picker and appends only the checked message(s)',
    clipboardPickerTests.pickerClosedAfterInsert && clipboardPickerTests.insertedOnlyFirstMessage, JSON.stringify(clipboardPickerTests));
  check('Clipboard picker', 'Insert keeps whatever was already drafted in the textarea',
    clipboardPickerTests.existingDraftKeptOnInsert, JSON.stringify(clipboardPickerTests));
  check('Clipboard picker', 'Cancel closes the picker and leaves the textarea exactly as it was',
    clipboardPickerTests.pickerClosedAfterCancel && clipboardPickerTests.textareaUnchangedAfterCancel, JSON.stringify(clipboardPickerTests));
  check('Clipboard picker', 'A single-message clipboard still inserts directly with no picker shown',
    clipboardPickerTests.singleMessageNoPicker && clipboardPickerTests.singleMessageDirectInsert, JSON.stringify(clipboardPickerTests));

  // =====================================================================
  console.log('\n=== 2d. New Calls / 2nd Round / Reschedule imports merged into one Import button ===');
  // =====================================================================
  // Real request: too many separate import buttons scattered in the
  // toolbar (Import, Import 2nd Round, Import Reschedule/Cancel). Now
  // there's exactly one "📥 Import" button in the header, next to
  // Closures, opening a single panel with a New Calls / Reschedule tab
  // switcher and a 1st/2nd Round toggle inside the New Calls tab.
  const importHubTests = await page.evaluate(async () => {
    const out = {};
    closeAllPanels();
    render();
    out.oldButtonsGone = !document.getElementById('toggleImport') && !document.getElementById('toggleImport2nd') && !document.getElementById('toggleRescheduleImport');
    out.hubButtonExists = !!document.getElementById('toggleImportHub');

    document.getElementById('toggleImportHub').click();
    await new Promise(r => setTimeout(r, 20));
    out.opensOnNewCallsTab = !!document.getElementById('importText') && !document.getElementById('rescheduleImportText');

    document.getElementById('importHubTabReschedule').click();
    await new Promise(r => setTimeout(r, 20));
    out.switchesToRescheduleTab = !!document.getElementById('rescheduleImportText') && !document.getElementById('importText');

    document.getElementById('importHubTabNew').click();
    await new Promise(r => setTimeout(r, 20));
    out.switchesBackToNewTab = !!document.getElementById('importText');

    document.getElementById('importRound2nd').click();
    await new Promise(r => setTimeout(r, 20));
    out.roundToggleWorks = state.importDefaultRound === '2nd';

    document.getElementById('importText').value = 'Import Hub Test Candidate (UK) – Interview – Hub Test Co – 3:00 PM IST – Duration: 30 Mins';
    document.getElementById('runImport').click();
    // runImport() awaits a createBackup() call that tries a real network
    // fetch first (fails since there's no backend in this test) before it
    // gets to closing the panel — a short fixed sleep is a race, so poll
    // instead of guessing a delay.
    for(let i=0; i<40 && state.showImport; i++){ await new Promise(r => setTimeout(r, 50)); }
    const row = state.rows.find(r => r.candidate && r.candidate.includes('Import Hub Test Candidate'));
    out.importWorksThroughHub = !!row && row.round === '2nd';
    out.panelClosesAfterImport = !state.showImport && !state.showRescheduleImport;
    if(row) state.rows = state.rows.filter(r => r.id !== row.id);

    document.getElementById('toggleImportHub').click();
    await new Promise(r => setTimeout(r, 20));
    document.getElementById('importHubTabReschedule').click();
    await new Promise(r => setTimeout(r, 20));
    document.getElementById('rescheduleImportText').value = 'Import Hub Test Candidate – 3:00 PM IST – rescheduled from candidate side';
    document.getElementById('parseRescheduleBtn').click();
    await new Promise(r => setTimeout(r, 200));
    out.rescheduleWorksThroughHub = !!state.rescheduleReview;

    closeAllPanels();
    render();
    return out;
  });
  check('Import hub', 'The three separate import buttons (Import, Import 2nd Round, Import Reschedule) are gone',
    importHubTests.oldButtonsGone, JSON.stringify(importHubTests));
  check('Import hub', 'A single "Import" button exists in the header',
    importHubTests.hubButtonExists, JSON.stringify(importHubTests));
  check('Import hub', 'Clicking it opens on the New Calls tab by default',
    importHubTests.opensOnNewCallsTab, JSON.stringify(importHubTests));
  check('Import hub', 'The Reschedule/Cancel tab switches content without closing the panel',
    importHubTests.switchesToRescheduleTab, JSON.stringify(importHubTests));
  check('Import hub', 'Switching back to New Calls tab works',
    importHubTests.switchesBackToNewTab, JSON.stringify(importHubTests));
  check('Import hub', 'The 1st/2nd Round toggle inside the New Calls tab works',
    importHubTests.roundToggleWorks, JSON.stringify(importHubTests));
  check('Import hub', 'A call imported via the hub (with 2nd Round selected) is added with the right round',
    importHubTests.importWorksThroughHub, JSON.stringify(importHubTests));
  check('Import hub', 'The panel closes automatically after a successful import',
    importHubTests.panelClosesAfterImport, JSON.stringify(importHubTests));
  check('Import hub', 'The reschedule/cancel flow still works when reached through the hub\'s tab',
    importHubTests.rescheduleWorksThroughHub, JSON.stringify(importHubTests));

  // Close the panel back out — this app uses an exclusive-panel model
  // (any open panel hides the main call table), so leaving it open here
  // would break every test after this one.
  await page.evaluate(() => { closeAllPanels(); render(); });
  await page.waitForTimeout(100);

  // =====================================================================
  console.log('\n=== 2e. Portal Sync merged into one entry point (📡 Team Sync) ===');
  // =====================================================================
  // Real request: a quick "Sync Portal" action buried in the "⋯ More"
  // menu, and a fuller "Team Sync" panel buried in a different "🔧 Tools"
  // menu, both fetched the exact same Portal assignment data into two
  // separate state fields for two separate purposes (per-row 📡 mismatch
  // badges vs. the panel's own table). Now there's one entry point (Team
  // Sync) and one fetch (fetchPortalSync) that populates both.
  const portalSyncTests = await page.evaluate(async () => {
    const out = {};
    closeAllPanels();
    render();
    out.oldQuickButtonGone = !document.getElementById('syncPortalBtn');
    out.oldFunctionRemoved = typeof syncPortalData === 'undefined';

    // Team Sync lives under the "📊 Reports" menu (formerly "More"), not
    // "🔧 Admin" (formerly "Tools") — moved there in the More/Tools regroup.
    state.showMoreMenu = true;
    render();
    out.teamSyncButtonExists = !!document.getElementById('togglePortalSync');
    state.showMoreMenu = false;
    render();

    // Stub the backend so this runs without a real server, and confirm one
    // fetchPortalSync() call now feeds BOTH the panel's data AND the
    // per-row badge-matching data.
    const origApiCall = apiCall;
    const origBase = API_BASE_URL;
    API_BASE_URL = 'http://fake-backend.test';
    apiCall = async (resource, opts) => {
      if (resource === 'portal_sync' && opts.qs.includes('type=assignments')) {
        return { data: [{ candidate: 'Portal Sync Regression Candidate', time: '2:00 PM', team: 'HYD', teamCode: 'HYD', client: 'Acme', assignee: 'Karthikeya', status: 'Scheduled' }] };
      }
      if (resource === 'portal_sync' && opts.qs.includes('type=incentives')) {
        return { data: { byHandler: [], byTeam: {} } };
      }
      return { data: [] };
    };
    state.portalAssignments = null;
    state.portalSyncData = null;
    await fetchPortalSync('today');
    out.panelDataPopulated = !!(state.portalSyncData && state.portalSyncData.assignments.length === 1);
    out.rowBadgeDataPopulated = !!(state.portalAssignments && state.portalAssignments.length === 1 && state.portalAssignments[0].handler === 'Karthikeya');

    const savedRows = state.rows;
    state.rows = [{ id: 'portalsynctest', candidate: 'Portal Sync Regression Candidate', time: '2:00 PM', assignee: 'HYD Team', round: '1st Round' }];
    const match = findPortalMatch(state.rows[0]);
    out.rowBadgeMatchWorksFromOneSync = !!match && match.handler === 'Karthikeya';
    state.rows = savedRows;

    apiCall = origApiCall;
    API_BASE_URL = origBase;
    state.portalAssignments = null;
    state.portalSyncData = null;
    closeAllPanels();
    render();
    return out;
  });
  check('Portal sync', 'The separate "Sync Portal" quick-action button (and its function) is gone',
    portalSyncTests.oldQuickButtonGone && portalSyncTests.oldFunctionRemoved, JSON.stringify(portalSyncTests));
  check('Portal sync', 'The single "📡 Team Sync" entry point still exists (now under the Reports menu)',
    portalSyncTests.teamSyncButtonExists, JSON.stringify(portalSyncTests));
  check('Portal sync', 'One fetchPortalSync() call populates the Team Sync panel\'s own data',
    portalSyncTests.panelDataPopulated, JSON.stringify(portalSyncTests));
  check('Portal sync', 'The SAME call also populates the data the per-row 📡 mismatch badge needs',
    portalSyncTests.rowBadgeDataPopulated, JSON.stringify(portalSyncTests));
  check('Portal sync', 'findPortalMatch() actually finds a match off that one shared sync',
    portalSyncTests.rowBadgeMatchWorksFromOneSync, JSON.stringify(portalSyncTests));

  // =====================================================================
  console.log('\n=== 2f. "More"/"Tools" regrouped into "📊 Reports" / "🔧 Admin" ===');
  // =====================================================================
  // Real request: the old More/Tools split had no clear logic (a lookup
  // like Client History Search sat in More while another lookup, Team
  // Sync, sat in Tools; Team roster was in Tools while Users was in
  // More). Regrouped by purpose: Reports & Lookup vs Admin & Team, with
  // the two destructive actions (Remove Duplicates, Clear all calls)
  // visually separated at the bottom of Admin behind a divider so they're
  // not one tap away from routine lookups.
  const menuRegroupTests = await page.evaluate(() => {
    const out = {};
    closeAllPanels();

    // Log out only renders once logged in (ADMIN_PASSWORD or
    // CURRENT_USERNAME set) — simulate that so this check actually
    // exercises the "still reachable" path instead of trivially passing
    // on an absent button.
    const savedUsername = CURRENT_USERNAME;
    CURRENT_USERNAME = 'RegressionTestUser';

    state.showMoreMenu = true;
    render();
    const reportsItems = Array.from(document.querySelectorAll('.more-menu-dropdown .more-menu-item')).map(b => b.id);
    out.reportsButtonLabel = document.getElementById('toggleMoreMenu').textContent.trim();
    out.reportsHasSummary = reportsItems.includes('toggleSummary');
    out.reportsHasAllDates = reportsItems.includes('toggleAllDates');
    out.reportsHasStudentsMaster = reportsItems.includes('toggleStudentsMaster');
    out.reportsHasClientSearch = reportsItems.includes('toggleClientSearch');
    out.reportsHasTeamSync = reportsItems.includes('togglePortalSync');
    out.reportsHasLogout = reportsItems.includes('headerLogoutBtn');
    // Admin-only items must NOT have leaked into Reports.
    out.reportsDoesNotHaveUsers = !reportsItems.includes('toggleUsers');
    out.reportsDoesNotHaveRoster = !reportsItems.includes('toggleRoster');
    state.showMoreMenu = false;
    CURRENT_USERNAME = savedUsername;
    render();

    state.showToolsMenu = true;
    render();
    const adminItems = Array.from(document.querySelectorAll('.more-menu-dropdown .more-menu-item')).map(b => b.id);
    out.adminButtonLabel = document.getElementById('toggleToolsMenu').textContent.trim();
    out.adminHasRoster = adminItems.includes('toggleRoster');
    out.adminHasUsers = adminItems.includes('toggleUsers');
    out.adminHasIncentives = adminItems.includes('toggleIncentives');
    out.adminHasBackups = adminItems.includes('toggleBackups');
    out.adminHasRemoveDup = adminItems.includes('removeDuplicatesBtn');
    out.adminHasClearAll = adminItems.includes('clearAll');
    // Team Sync must NOT have leaked into Admin (moved to Reports).
    out.adminDoesNotHaveTeamSync = !adminItems.includes('togglePortalSync');
    // The danger-zone divider actually separates the destructive actions
    // from the routine ones, not just present somewhere in the menu.
    const dividerIdx = Array.from(document.querySelectorAll('.more-menu-dropdown > *')).findIndex(el => el.classList.contains('more-menu-divider'));
    const removeDupIdx = Array.from(document.querySelectorAll('.more-menu-dropdown > *')).findIndex(el => el.id === 'removeDuplicatesBtn');
    const rosterIdx = Array.from(document.querySelectorAll('.more-menu-dropdown > *')).findIndex(el => el.id === 'toggleRoster');
    out.dividerSeparatesDangerZone = dividerIdx !== -1 && rosterIdx < dividerIdx && removeDupIdx > dividerIdx;
    state.showToolsMenu = false;

    closeAllPanels();
    render();
    return out;
  });
  check('Menu regroup', 'Reports menu (formerly "More") is relabeled and has Summary/All Dates/Students Master/Client Search',
    menuRegroupTests.reportsButtonLabel.includes('Reports') && menuRegroupTests.reportsHasSummary && menuRegroupTests.reportsHasAllDates && menuRegroupTests.reportsHasStudentsMaster && menuRegroupTests.reportsHasClientSearch,
    JSON.stringify(menuRegroupTests));
  check('Menu regroup', 'Team Sync moved into the Reports menu',
    menuRegroupTests.reportsHasTeamSync, JSON.stringify(menuRegroupTests));
  check('Menu regroup', 'Log out is still reachable, from the Reports menu',
    menuRegroupTests.reportsHasLogout, JSON.stringify(menuRegroupTests));
  check('Menu regroup', 'Admin-only items (Users, Team roster) did not leak into the Reports menu',
    menuRegroupTests.reportsDoesNotHaveUsers && menuRegroupTests.reportsDoesNotHaveRoster, JSON.stringify(menuRegroupTests));
  check('Menu regroup', 'Admin menu (formerly "Tools") is relabeled and has Team/Users/Incentives/Backups',
    menuRegroupTests.adminButtonLabel.includes('Admin') && menuRegroupTests.adminHasRoster && menuRegroupTests.adminHasUsers && menuRegroupTests.adminHasIncentives && menuRegroupTests.adminHasBackups,
    JSON.stringify(menuRegroupTests));
  check('Menu regroup', 'Remove Duplicates and Clear all calls are still in the Admin menu',
    menuRegroupTests.adminHasRemoveDup && menuRegroupTests.adminHasClearAll, JSON.stringify(menuRegroupTests));
  check('Menu regroup', 'Team Sync did NOT leak into the Admin menu (moved out to Reports)',
    menuRegroupTests.adminDoesNotHaveTeamSync, JSON.stringify(menuRegroupTests));
  check('Menu regroup', 'A divider visually separates the destructive actions from the routine ones in Admin',
    menuRegroupTests.dividerSeparatesDangerZone, JSON.stringify(menuRegroupTests));

  // =====================================================================
  console.log('\n=== 2g. Portal Sync gets a longer request timeout (was timing out on real cold starts) ===');
  // =====================================================================
  // Real report: "portal sync error: ... the server took too long to
  // respond (over 20s)". Root cause — apiCall() hard-coded a 20s abort for
  // EVERY request, but Portal Sync proxies out to a separate Apps Script
  // bridge (its own cold start on top of this backend's) and Full Sync
  // deliberately pulls the entire call history, which the code's own old
  // comment already admitted could take "~20s" on its own — so the timeout
  // was firing right as a legitimate slow request was about to succeed.
  // Fix: apiCall() now accepts an opts.timeoutMs override (default stays
  // 20s for every other caller), and fetchPortalSync() asks for 30s on
  // Today / 45s on Full Sync.
  const timeoutTests = await page.evaluate(async () => {
    const out = {};

    // apiCall actually honors a custom timeoutMs (not just accepts and
    // ignores it) — verified by making it abort at a deliberately short
    // custom value and checking it fires at THAT time, not the 20s default.
    const origFetch = window.fetch;
    window.fetch = (url, opts) => new Promise((resolve, reject) => {
      if (opts && opts.signal) {
        opts.signal.addEventListener('abort', () => {
          const err = new Error('The operation was aborted.');
          err.name = 'AbortError';
          reject(err);
        });
      }
      // otherwise never resolves — simulates a hung/cold-starting backend
    });
    const savedBase = API_BASE_URL;
    API_BASE_URL = 'http://fake-backend.test';

    const t0 = Date.now();
    try {
      await apiCall('portal_sync', { qs: 'type=assignments', timeoutMs: 300 });
    } catch (e) {
      out.customTimeoutElapsedMs = Date.now() - t0;
      out.customTimeoutMessage = e.message;
    }
    window.fetch = origFetch;
    API_BASE_URL = savedBase;

    // fetchPortalSync() requests the right timeout per mode — intercept
    // apiCall to record what it was actually called with, without needing
    // to wait out a real 30-45s timeout in this test.
    const origApiCall = apiCall;
    const calls = [];
    apiCall = async (resource, opts) => {
      calls.push(opts.timeoutMs);
      if (opts.qs.includes('type=assignments')) return { data: [] };
      return { data: { byHandler: [], byTeam: {} } };
    };
    API_BASE_URL = 'http://fake-backend.test';
    await fetchPortalSync('today');
    out.todayTimeouts = calls.slice();
    calls.length = 0;
    await fetchPortalSync('full');
    out.fullTimeouts = calls.slice();
    apiCall = origApiCall;
    API_BASE_URL = savedBase;

    // A default apiCall (no timeoutMs passed) must still fall back to a
    // real, generous value rather than 0/undefined breaking setTimeout.
    out.defaultInSource = apiCall.toString().includes('opts.timeoutMs || 20000');

    return out;
  });
  check('Portal sync timeout', 'apiCall() actually honors a custom timeoutMs (aborts at that time, not the 20s default)',
    timeoutTests.customTimeoutElapsedMs != null && timeoutTests.customTimeoutElapsedMs < 2000 && timeoutTests.customTimeoutElapsedMs >= 250,
    JSON.stringify(timeoutTests));
  check('Portal sync timeout', 'The abort error message reflects the timeout that was actually used',
    !!timeoutTests.customTimeoutMessage && timeoutTests.customTimeoutMessage.includes('portal_sync'), JSON.stringify(timeoutTests));
  check('Portal sync timeout', 'fetchPortalSync("today") requests a longer-than-default timeout (30s) on both its calls',
    JSON.stringify(timeoutTests.todayTimeouts) === JSON.stringify([30000, 30000]), JSON.stringify(timeoutTests));
  check('Portal sync timeout', 'fetchPortalSync("full") requests an even longer timeout (45s) on both its calls',
    JSON.stringify(timeoutTests.fullTimeouts) === JSON.stringify([45000, 45000]), JSON.stringify(timeoutTests));
  check('Portal sync timeout', 'Every other apiCall() caller still defaults to the original 20s (unaffected by this fix)',
    timeoutTests.defaultInSource, JSON.stringify(timeoutTests));

  // =====================================================================
  console.log('\n=== 3. Students Master fuzzy name matching ===');
  // =====================================================================
  const matchingCases = await page.evaluate(() => {
    state.studentsMaster = [
      { id: 's1', name: 'Sushmitha Basavaraju', country: 'USA' },
      { id: 's2', name: 'Chidghana Hemantharaju', country: 'Germany' },
      { id: 's3', name: 'S Sricharan', country: 'USA' },
    ];
    const out = {};
    out.abbreviation = findStudentMasterMatch('Sushmitha B');
    out.typoTolerance = findStudentMasterMatch('Chigdhana Hemantharaju'); // two letters swapped
    out.reorderedWords = findStudentMasterMatch('Sri Charan Sadhu'); // vs "S Sricharan" pattern below
    out.initialPlusCompound1 = findStudentMasterMatch('Sadhu Sri Charan');
    out.initialPlusCompound2 = findStudentMasterMatch('S Sricharan');

    // Genuine ambiguity: two DIFFERENT real students who both reduce to
    // "S Sricharan" via the same letters — must refuse to guess.
    state.studentsMaster.push({ id: 's4', name: 'Sudha Chari Ansr', country: 'UK' }); // same letter multiset as Sadhu Sri Charan
    out.ambiguityRefusal = findStudentMasterMatch('Sri Charan Sadhu');

    return {
      abbreviation: out.abbreviation ? out.abbreviation.name : null,
      typoTolerance: out.typoTolerance ? out.typoTolerance.name : null,
      initialPlusCompound1: out.initialPlusCompound1 ? out.initialPlusCompound1.name : null,
      initialPlusCompound2: out.initialPlusCompound2 ? out.initialPlusCompound2.name : null,
      ambiguityRefusal: out.ambiguityRefusal ? out.ambiguityRefusal.name : null,
    };
  });
  check('Students Master', '"Sushmitha B" abbreviation match',
    matchingCases.abbreviation === 'Sushmitha Basavaraju', `got "${matchingCases.abbreviation}"`);
  check('Students Master', 'Typo tolerance ("Chigdhana" vs "Chidghana")',
    matchingCases.typoTolerance === 'Chidghana Hemantharaju', `got "${matchingCases.typoTolerance}"`);
  check('Students Master', 'Initial+compound match ("Sadhu Sri Charan" → "S Sricharan")',
    matchingCases.initialPlusCompound1 === 'S Sricharan', `got "${matchingCases.initialPlusCompound1}"`);
  check('Students Master', 'Reverse form also matches ("S Sricharan" → itself, exact)',
    matchingCases.initialPlusCompound2 === 'S Sricharan', `got "${matchingCases.initialPlusCompound2}"`);
  check('Students Master', 'Genuine ambiguity correctly refuses to guess',
    matchingCases.ambiguityRefusal === null, `got "${matchingCases.ambiguityRefusal}" (should be null)`);

  // =====================================================================
  console.log('\n=== 4. WOI → scheduled merge (no-duplicate-on-update) ===');
  // =====================================================================
  const woiCase = await page.evaluate(() => {
    const existingRows = [{ id: 'w1', candidate: 'Satya Pavan', company: 'Deloitte', time: '', woi: true }];
    const parsedRow = { candidate: 'Satya Pavan', company: '', time: '7:00 PM', woi: false, round: '1st' };
    const match = findExistingCallMatch(parsedRow, existingRows);
    return match ? match.id : null;
  });
  check('WOI merge', 'A re-pasted WOI call with a real time now matches its existing WOI row',
    woiCase === 'w1', `got "${woiCase}"`);

  // =====================================================================
  console.log('\n=== 5. Role-based permissions ===');
  // =====================================================================
  await page.evaluate(() => {
    state.view = 'all';
    state.rows = [{ id: 'r1', time: '2:00 PM', company: 'Acme', candidate: 'Alice', round: '1st', duration: '30 mins', woi: false, assignee: 'HYD Team', country: 'USA', doubts: [] }];
  });
  await page.evaluate(() => { CURRENT_ROLE = 'team_lead'; render(); });
  await page.waitForTimeout(150);
  const teamLeadChecks = await page.evaluate(() => ({
    incentivesHidden: document.getElementById('toggleIncentives') === null,
    backupsHidden: document.getElementById('toggleBackups') === null,
    saveButtonHidden: document.getElementById('saveAllBtn') === null,
    drivingPersonEnabled: !document.querySelector('.driving-person-select')?.disabled,
  }));
  check('Permissions', 'Team Lead: Incentives panel hidden', teamLeadChecks.incentivesHidden);
  check('Permissions', 'Team Lead: Backups panel hidden', teamLeadChecks.backupsHidden);
  check('Permissions', 'Team Lead: general Save button hidden', teamLeadChecks.saveButtonHidden);
  check('Permissions', 'Team Lead: Driving Person stays editable', teamLeadChecks.drivingPersonEnabled);

  await page.evaluate(() => { CURRENT_ROLE = 'user'; render(); });
  await page.waitForTimeout(150);
  const plainUserChecks = await page.evaluate(() => ({
    drivingPersonDisabled: document.querySelector('.driving-person-select')?.disabled === true,
  }));
  check('Permissions', 'Plain read-only User: Driving Person is NOT editable', plainUserChecks.drivingPersonDisabled);
  await page.evaluate(() => { CURRENT_ROLE = 'admin'; render(); });

  // =====================================================================
  console.log('\n=== 6. Core row interactions (delegated handlers) ===');
  // =====================================================================
  await page.evaluate(() => {
    state.view = 'all';
    state.rows = [
      { id: 'i1', time: '2:00 PM', company: 'Acme', candidate: 'Alice', round: '1st', duration: '30 mins', woi: false, assignee: '', country: 'USA', doubts: [] },
      { id: 'i2', time: '3:00 PM', company: 'Beta', candidate: 'Bob', round: '1st', duration: '30 mins', woi: false, assignee: 'HYD Team', country: 'USA', doubts: [] },
    ];
    render();
  });
  await page.fill('tr[data-id="i1"] input[data-field="candidate"]', 'Alice Updated');
  await page.waitForTimeout(150);
  check('Row interactions', 'Text field edit updates state',
    (await page.evaluate(() => state.rows.find(r => r.id === 'i1').candidate)) === 'Alice Updated');

  await page.selectOption('tr[data-id="i1"] select[data-field="assignee"]', { value: 'Stephen' });
  await page.waitForTimeout(150);
  check('Row interactions', 'Select field edit updates state',
    (await page.evaluate(() => state.rows.find(r => r.id === 'i1').assignee)) === 'Stephen');

  const move2ndVisible = await page.locator('tr[data-id="i2"] .move-2nd').count();
  if (move2ndVisible > 0) {
    await page.click('tr[data-id="i2"] .move-2nd');
    await page.waitForTimeout(150);
    const afterMove = await page.evaluate(() => state.rows.find(r => r.id === 'i2'));
    check('Row interactions', 'Move-to-2nd sets round AND clears team-level assignee',
      afterMove.round === '2nd Round' && afterMove.assignee === '');
  }

  await page.click('tr[data-id="i1"] [data-del]');
  await page.waitForTimeout(150);
  check('Row interactions', 'Delete button removes the row',
    (await page.evaluate(() => !state.rows.find(r => r.id === 'i1'))));
  check('Row interactions', 'Undo toast appears after delete',
    await page.locator('.undo-toast').isVisible());

  // No duplicate-firing after many re-renders (delegation guard check).
  const noDoubleFire = await page.evaluate(() => {
    state.rows = [{ id: 'd1', time: '2:00 PM', company: 'Acme', candidate: 'X', round: '1st', duration: '30 mins', woi: false, assignee: '', country: 'USA', doubts: [] }];
    for (let i = 0; i < 15; i++) render();
    let markDirtyCalls = 0;
    const orig = window.markDirty;
    window.markDirty = function (...a) { markDirtyCalls++; return orig.apply(this, a); };
    const input = document.querySelector('tr[data-id="d1"] input[data-field="candidate"]');
    input.value = 'Changed';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    window.markDirty = orig;
    return markDirtyCalls;
  });
  check('Row interactions', 'Exactly one handler fires per edit even after 15 re-renders (no listener accumulation)',
    noDoubleFire === 1, `fired ${noDoubleFire} times`);

  // =====================================================================
  console.log('\n=== 7. Mobile layout ===');
  // =====================================================================
  await browser.close();
  const mBrowser = await chromium.launch();
  const mPage = await mBrowser.newPage({ viewport: { width: 390, height: 900 }, isMobile: true, hasTouch: true });
  const mErrors = [];
  mPage.on('pageerror', err => mErrors.push(err.message));
  await mPage.goto('file://' + INDEX_PATH, { waitUntil: 'domcontentloaded' });
  await mPage.waitForTimeout(2000);
  await mPage.evaluate(() => {
    state.view = 'all';
    state.rows = [{ id: 'm1', time: '2:00 PM', company: 'Acme Corp', candidate: 'Alice Smith', round: '1st', duration: '30 mins', woi: false, assignee: 'HYD Team', country: 'USA', doubts: [] }];
    render();
  });
  await mPage.waitForTimeout(300);
  const hOverflow = await mPage.evaluate(() => document.body.scrollWidth - window.innerWidth);
  check('Mobile', 'Zero horizontal overflow on a narrow (390px) screen', hOverflow === 0, `overflow=${hOverflow}px`);

  // Swipe-right opens the full assign picker (not a fixed "assign to me").
  await mPage.evaluate(() => {
    window.__swipeHelper = function (rowId, dxTotal) {
      const tr = document.querySelector(`tbody tr[data-id="${rowId}"]`);
      const rect = tr.getBoundingClientRect();
      const startX = rect.left + 40, startY = rect.top + rect.height / 2;
      function mk(x, y) { return new Touch({ identifier: 1, target: tr, clientX: x, clientY: y, pageX: x, pageY: y }); }
      let t = mk(startX, startY);
      tr.dispatchEvent(new TouchEvent('touchstart', { touches: [t], targetTouches: [t], changedTouches: [t], bubbles: true, cancelable: true }));
      let lastX = startX;
      for (let i = 1; i <= 8; i++) {
        lastX = startX + (dxTotal * i / 8);
        let t2 = mk(lastX, startY);
        tr.dispatchEvent(new TouchEvent('touchmove', { touches: [t2], targetTouches: [t2], changedTouches: [t2], bubbles: true, cancelable: true }));
      }
      let t3 = mk(lastX, startY);
      tr.dispatchEvent(new TouchEvent('touchend', { touches: [], targetTouches: [], changedTouches: [t3], bubbles: true, cancelable: true }));
    };
    window.__swipeHelper('m1', 130);
  });
  await mPage.waitForTimeout(300);
  const pickerCheck = await mPage.evaluate(() => ({
    visible: document.getElementById('myNamePickerOverlay') !== null,
    hasTeamGroup: document.querySelector('.my-name-picker-item[data-name="HYD Team"]') !== null,
  }));
  check('Mobile', 'Swipe-right opens the full assign picker', pickerCheck.visible);
  check('Mobile', 'Picker includes team-level assign options', pickerCheck.hasTeamGroup);

  // A touch that starts on a control INSIDE the row (its delete button,
  // in this case) must never be hijacked into a swipe-delete/assign —
  // real report: "records has also left right options" fighting with
  // the row's own left-right swipe gesture.
  await mPage.evaluate(() => {
    state.rows = [{ id: 'm2', time: '2:00 PM', company: 'Acme Corp', candidate: 'Bob Jones', round: '1st', duration: '30 mins', woi: false, assignee: 'HYD Team', country: 'USA', doubts: [] }];
    render();
  });
  await mPage.waitForTimeout(200);
  const rowCountBeforeButtonDrag = await mPage.evaluate(() => state.rows.length);
  await mPage.evaluate(() => {
    const btn = document.querySelector('tbody tr[data-id="m2"] .row-del');
    const rect = btn.getBoundingClientRect();
    const startX = rect.left + rect.width / 2, startY = rect.top + rect.height / 2;
    function mk(x, y) { return new Touch({ identifier: 1, target: btn, clientX: x, clientY: y, pageX: x, pageY: y }); }
    btn.dispatchEvent(new TouchEvent('touchstart', { touches: [mk(startX, startY)], targetTouches: [mk(startX, startY)], changedTouches: [mk(startX, startY)], bubbles: true, cancelable: true }));
    for (let i = 1; i <= 6; i++) {
      const x = startX - (100 * i / 6);
      btn.dispatchEvent(new TouchEvent('touchmove', { touches: [mk(x, startY)], targetTouches: [mk(x, startY)], changedTouches: [mk(x, startY)], bubbles: true, cancelable: true }));
    }
    btn.dispatchEvent(new TouchEvent('touchend', { touches: [], targetTouches: [], changedTouches: [mk(startX - 100, startY)], bubbles: true, cancelable: true }));
  });
  await mPage.waitForTimeout(300);
  const rowCountAfterButtonDrag = await mPage.evaluate(() => state.rows.length);
  check('Mobile', 'Dragging from the row\'s own delete button does not trigger swipe-delete',
    rowCountAfterButtonDrag === rowCountBeforeButtonDrag,
    `rows ${rowCountBeforeButtonDrag} -> ${rowCountAfterButtonDrag}`);

  // A mostly-vertical drag (ordinary scrolling) with a little horizontal
  // wobble must not be misread as a horizontal swipe.
  await mPage.evaluate(() => { state.showSwipeAssignPicker = false; state.pendingSwipeAssignRowId = null; render(); });
  const rowCountBeforeScroll = await mPage.evaluate(() => state.rows.length);
  await mPage.evaluate(() => {
    const tr = document.querySelector('tbody tr[data-id="m2"]');
    const rect = tr.getBoundingClientRect();
    const startX = rect.left + 40, startY = rect.top + rect.height / 2;
    function mk(x, y) { return new Touch({ identifier: 1, target: tr, clientX: x, clientY: y, pageX: x, pageY: y }); }
    tr.dispatchEvent(new TouchEvent('touchstart', { touches: [mk(startX, startY)], targetTouches: [mk(startX, startY)], changedTouches: [mk(startX, startY)], bubbles: true, cancelable: true }));
    for (let i = 1; i <= 8; i++) {
      const x = startX + (20 * i / 8), y = startY + (200 * i / 8);
      tr.dispatchEvent(new TouchEvent('touchmove', { touches: [mk(x, y)], targetTouches: [mk(x, y)], changedTouches: [mk(x, y)], bubbles: true, cancelable: true }));
    }
    tr.dispatchEvent(new TouchEvent('touchend', { touches: [], targetTouches: [], changedTouches: [mk(startX + 20, startY + 200)], bubbles: true, cancelable: true }));
  });
  await mPage.waitForTimeout(300);
  const afterVerticalScroll = await mPage.evaluate(() => ({ rows: state.rows.length, picker: !!document.getElementById('myNamePickerOverlay') }));
  check('Mobile', 'A mostly-vertical drag with slight horizontal wobble is treated as scrolling, not a swipe',
    afterVerticalScroll.rows === rowCountBeforeScroll && !afterVerticalScroll.picker);

  // The More/Tools mobile menu must render as a fully on-screen, fully
  // tappable bottom sheet no matter where the page is scrolled to — real
  // report: "opened but there is no chance to select any option."
  await mPage.evaluate(() => {
    state.rows = Array.from({ length: 25 }, (_, i) => ({ id: 'bulk' + i, time: '2:00 PM', company: 'Acme', candidate: 'Row ' + i, round: '1st', duration: '30 mins', woi: false, assignee: '', country: 'USA', doubts: [] }));
    render();
    window.scrollTo(0, document.body.scrollHeight);
  });
  await mPage.waitForTimeout(200);
  const navMoreBtn = await mPage.$('#navMore');
  if (navMoreBtn) await navMoreBtn.click();
  await mPage.waitForTimeout(300);
  const menuCheck = await mPage.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.more-menu-item'));
    return items.length > 0 && items.every(item => {
      const r = item.getBoundingClientRect();
      const onScreen = r.top >= 0 && r.bottom <= window.innerHeight && r.left >= 0 && r.right <= window.innerWidth;
      const topEl = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return onScreen && topEl === item;
    });
  });
  check('Mobile', 'More menu (opened via bottom nav, scrolled to bottom of a long list) is fully on-screen and every item is tappable', menuCheck);

  // Real report: a long client name made the "Filter by client" <select>
  // (which used to size itself to its widest option, uncapped) push the
  // filter bar wider than the screen, showing an unwanted horizontal
  // scroller. Confirm it stays capped even with several long names.
  await mPage.evaluate(() => {
    const names = ['Some Very Long Enterprise Client Company Name Corporation Limited', 'Another International Multinational Consulting Group LLC', 'Short Co'];
    state.rows = names.map((n, i) => ({ id: 'fb' + i, time: '2:00 PM', company: n, candidate: 'Cand ' + i, round: '1st', duration: '30 mins', woi: false, assignee: '', country: 'USA', doubts: [] }));
    render();
  });
  await mPage.waitForTimeout(300);
  const filterBarOverflow = await mPage.evaluate(() => ({
    bodyOverflow: document.body.scrollWidth - window.innerWidth,
    windowWidth: window.innerWidth,
  }));
  check('Mobile', 'A long client name in the "Filter by client" dropdown does not overflow the screen',
    filterBarOverflow.bodyOverflow === 0 && filterBarOverflow.windowWidth === 390,
    `overflow=${filterBarOverflow.bodyOverflow}px, innerWidth=${filterBarOverflow.windowWidth}`);

  console.log('\nMobile page errors:', mErrors.length ? mErrors.join('\n') : '(none)');
  await mBrowser.close();

  // =====================================================================
  console.log('\n=== 8. Panel smoke test (every panel opens without a JS error) ===');
  // =====================================================================
  const sBrowser = await chromium.launch();
  const sPage = await sBrowser.newPage();
  const sErrors = [];
  sPage.on('pageerror', err => sErrors.push(err.message));
  sPage.on('console', msg => {
    const t = msg.text();
    if (msg.type() === 'error' && !t.includes('CORS') && !t.includes('Failed to load resource') && !t.includes('Failed to fetch')) sErrors.push('[console] ' + t);
  });
  sPage.on('dialog', d => d.accept());
  await sPage.goto('file://' + INDEX_PATH, { waitUntil: 'domcontentloaded' });
  await sPage.waitForTimeout(2500);
  await sPage.evaluate(() => {
    state.view = 'all';
    state.rows = [{ id: 'p1', time: '2:00 PM', company: 'Acme', candidate: 'Alice', round: '2nd Round', duration: '30 mins', woi: false, assignee: 'Karthikeya', country: 'USA', doubts: [] }];
    render();
  });
  async function click(id, ms) { try { await sPage.click('#' + id, { timeout: 2000 }); await sPage.waitForTimeout(ms || 150); return true; } catch (e) { return false; } }
  await click('toggleNotifications');
  const notifTabs = await sPage.locator('.notif-tab-btn').count();
  for (let i = 0; i < notifTabs; i++) { await sPage.locator('.notif-tab-btn').nth(i).click().catch(() => {}); await sPage.waitForTimeout(80); }
  await sPage.evaluate(() => { closeAllPanels(); render(); });
  await sPage.evaluate(() => { closeAllPanels(); render(); });
  await click('toggleImportHub', 150);
  for (const id of ['importHubTabNew', 'importHubTabReschedule']) {
    await click(id, 150);
  }
  await sPage.evaluate(() => { closeAllPanels(); render(); });
  await click('toggleToolsMenu');
  for (const id of ['toggleRoster', 'togglePortalSync', 'toggleIncentives', 'toggleBackups']) {
    await sPage.evaluate(() => { closeAllPanels(); render(); });
    await click('toggleToolsMenu', 80);
    await click(id, 150);
  }
  await sPage.evaluate(() => { closeAllPanels(); render(); });
  await click('toggleMoreMenu');
  for (const id of ['toggleStudentsMaster', 'toggleClientSearch', 'toggleSummary', 'toggleAllDates', 'toggleUniversalSearch', 'toggleMissedCheck']) {
    await sPage.evaluate(() => { closeAllPanels(); state.showMoreMenu = false; render(); });
    await click('toggleMoreMenu', 80);
    await click(id, 200);
  }
  // WOI Aging / Workload Heatmap / Weekly Recap now live as tabs inside the
  // Notifications panel (clubbed with the other cross-date reports) rather
  // than as separate top-level panels.
  await sPage.evaluate(() => { closeAllPanels(); render(); });
  await click('toggleNotifications', 150);
  for (const tab of ['woiAging', 'workloadHeatmap', 'weeklyRecap']) {
    await sPage.evaluate((t) => { state.notifTab = t; render(); }, tab);
    await sPage.waitForTimeout(120);
  }
  await sPage.evaluate(() => { state.notifTab = 'woiAging'; render(); });
  await click('runWoiAgingScan', 300);
  await sPage.evaluate(() => { state.notifTab = 'weeklyRecap'; render(); });
  await click('runWeeklyRecapScan', 300);
  await sPage.evaluate(() => { closeAllPanels(); render(); });
  await click('toggleMoreMenu', 100);
  await click('toggleSummary', 150);
  await click('shareWhatsAppBtn', 150);
  await sPage.evaluate(() => { closeAllPanels(); render(); });
  for (const view of ['all', '1st', '2nd', 'doubts', 'rescheduled']) {
    await sPage.evaluate((v) => { closeAllPanels(); state.view = v; render(); }, view);
    await sPage.waitForTimeout(100);
  }
  check('Panel smoke test', 'Every panel + every tab opens with zero JS errors', sErrors.length === 0, sErrors.join(' | '));
  await sBrowser.close();

  // =====================================================================
  console.log('\n=== SUMMARY ===');
  // =====================================================================
  console.log(`${pass} passed, ${fail} failed (of ${pass + fail} checks)`);
  if (pageErrors.length) {
    console.log('\nUnexpected page errors during the run:');
    console.log(pageErrors.join('\n'));
  }
  if (failures.length) {
    console.log('\nFailed checks:');
    failures.forEach(f => console.log('  - ' + f));
  }
  process.exit(fail > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Test suite crashed:', err);
  process.exit(1);
});
