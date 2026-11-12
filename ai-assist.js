// ---------------------------------------------------------------------------
// AI assist (added 2026-11-12) — four fixed, locked-down text tasks for the desk, served through the
// same OpenAI-compatible provider (Groq) and the same key as Ask Desk (GROQ_API_KEY). The server fixes the
// system prompt for each task, so this cannot be used as a general-purpose chatbot. Shares the per-user
// daily call limit (AI_DAILY_LIMIT, default 300) with Ask Desk. Nothing is stored.
//   task "chase"  : write short, friendly messages asking a coordinator for call feedback
//   task "digest" : one-to-three line summary of the current alerts
//   task "prep"   : brief suggestions for a candidate, from their saved feedback history
//   task "sort"   : split pasted scrum / chat notes into Name / Client / Feedback blocks
// ---------------------------------------------------------------------------
const TASKS = {
  chase: { max: 700, sys: 'You write short WhatsApp-style messages for a recruitment scheduling desk. For EACH person in the input, write one friendly, professional message asking them to share the interview feedback for the listed calls (use a numbered list of date, time, candidate, company). Start each message with a line "To: <person name>". Plain text only, no markdown, no emojis, under 90 words per message. Use only the names and calls given.' },
  digest: { max: 220, sys: 'You summarise alerts for a recruitment scheduling coordinator. Given a list of alerts, reply with 1 to 3 short plain-text lines: what needs attention first and why. Mention counts and candidate or company names only if they appear in the input. No markdown, no greetings, no invented facts.' },
  prep: { max: 380, sys: 'You help a recruitment coordinator prepare a candidate for an interview. Using ONLY the saved feedback notes provided, give 2 to 4 short, concrete bullet points ("- ...") of what to brief or practise with the candidate before the next call, then one line starting "Watch:" for the main risk. If the notes say nothing useful, say so in one line. Plain text, no invented facts.' },
  sort: { max: 1400, sys: 'You turn pasted team-scrum or chat notes about interview calls into feedback blocks. Output ONLY blocks in exactly this format, separated by a blank line:\nName: <candidate full name>\nClient: <company, or empty>\nFeedback: <what was said about the call, in one or two sentences, keeping the original meaning>\nInclude only candidates for whom feedback about a call is actually given. Never invent names, companies or feedback. If nothing qualifies, output exactly: NONE' },
};
function clip(v, n) { return String(v == null ? '' : v).slice(0, n); }
function buildUser(task, input) {
  const i = input && typeof input === 'object' ? input : {};
  if (task === 'chase') {
    const groups = Array.isArray(i.groups) ? i.groups.slice(0, 12) : [];
    return groups.map(g => 'Person: ' + clip(g && g.person, 60) + '\n' + (Array.isArray(g && g.calls) ? g.calls.slice(0, 15) : []).map((c, k) => (k + 1) + '. ' + clip(c && c.date, 12) + ' ' + clip(c && c.time, 12) + ' - ' + clip(c && c.candidate, 60) + ' (' + clip(c && c.company, 60) + ')').join('\n')).join('\n\n');
  }
  if (task === 'digest') {
    return (Array.isArray(i.items) ? i.items.slice(0, 30) : []).map((a, k) => (k + 1) + '. ' + clip(a, 220)).join('\n');
  }
  if (task === 'prep') {
    return 'Candidate: ' + clip(i.candidate, 80) + '\nNext call: ' + clip(i.next, 160) + '\nSaved feedback (newest first):\n' + (Array.isArray(i.history) ? i.history.slice(0, 6) : []).map(h => '- ' + clip(h && h.date, 12) + (h && h.company ? ' (' + clip(h.company, 60) + ')' : '') + ': ' + clip(h && h.text, 500)).join('\n');
  }
  if (task === 'sort') {
    if (!clip(i.text, 10).trim()) return '';
    const names = Array.isArray(i.names) ? i.names.slice(0, 120).map(n => clip(n, 60)).join('; ') : '';
    return (names ? 'Candidates on today\'s board (use these spellings when a note clearly refers to one): ' + names + '\n\n' : '') + 'Notes:\n' + clip(i.text, 6000);
  }
  return '';
}
async function handleAiAssist(req, res, db, auth) {
  const model = process.env.AI_MODEL || 'openai/gpt-oss-120b';
  const limit = Math.max(1, Number(process.env.AI_DAILY_LIMIT || 300));
  if (req.method === 'GET') return res.status(200).json({ configured: !!process.env.GROQ_API_KEY, tasks: Object.keys(TASKS) });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const key = process.env.GROQ_API_KEY;
  if (!key) return res.status(503).json({ error: 'AI is not configured yet. Add GROQ_API_KEY in Vercel.', code: 'not_configured' });
  const body = req.body || {};
  const task = String(body.task || '');
  if (!TASKS[task]) return res.status(400).json({ error: 'Unknown AI task.', code: 'bad_request' });
  const user = buildUser(task, body.input);
  if (!user || user.length < 5) return res.status(400).json({ error: 'Nothing to work on.', code: 'bad_request' });
  try {
    await db.query('CREATE TABLE IF NOT EXISTS chat_usage (id BIGINT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(100) NOT NULL, used_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, INDEX idx_user_time (username, used_at))');
    const [rows] = await db.query('SELECT COUNT(*) AS cnt FROM chat_usage WHERE username = ? AND used_at > (NOW() - INTERVAL 24 HOUR)', [auth.username]);
    if (rows[0].cnt >= limit) return res.status(429).json({ error: 'Daily AI limit reached (' + limit + ' AI calls in 24 hours).', code: 'daily_limit' });
    await db.query('INSERT INTO chat_usage (username) VALUES (?)', [auth.username]);
  } catch (e) { console.error('ai_assist usage check failed (continuing):', e && e.message); }
  const payload = { model, messages: [{ role: 'system', content: TASKS[task].sys }, { role: 'user', content: user }], temperature: 0.3, max_tokens: TASKS[task].max };
  if (/^openai\/gpt-oss/.test(model)) payload.reasoning_effort = 'low';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  let upstream, text;
  try {
    upstream = await fetch((process.env.AI_BASE_URL || 'https://api.groq.com/openai/v1').replace(/\/$/, '') + '/chat/completions', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key }, body: JSON.stringify(payload), signal: controller.signal });
    text = await upstream.text();
  } catch (e) {
    clearTimeout(timer);
    if (e && e.name === 'AbortError') return res.status(504).json({ error: 'The AI took too long.', code: 'timeout' });
    return res.status(502).json({ error: 'Could not reach the AI service.', code: 'upstream' });
  }
  clearTimeout(timer);
  if (upstream.status === 429) return res.status(429).json({ error: 'The AI is busy right now. Try again in a minute.', code: 'busy' });
  if (upstream.status === 401 || upstream.status === 403) return res.status(502).json({ error: 'The AI key was rejected. Check GROQ_API_KEY in Vercel.', code: 'bad_key' });
  let parsed; try { parsed = JSON.parse(text); } catch (e) { parsed = null; }
  const out = parsed && parsed.choices && parsed.choices[0] && parsed.choices[0].message && parsed.choices[0].message.content;
  if (!upstream.ok || typeof out !== 'string' || !out.trim()) return res.status(502).json({ error: 'The AI returned an unexpected answer.', code: 'upstream' });
  return res.status(200).json({ text: out.trim() });
}
module.exports = { handleAiAssist, TASKS, buildUser };
