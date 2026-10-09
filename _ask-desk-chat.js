// ---------------------------------------------------------------------------
// Ask Desk chat (added 2026-10-09) — a thin, locked-down proxy to an
// OpenAI-compatible chat API (Groq by default). It does NOT read the
// database: the browser runs the read-only "tools" below against data it
// already has and sends the (name-masked) results back here. The server's job
// is only to (1) keep the API key secret, (2) fix the system prompt and the
// tool list so this can't be used as a general-purpose free LLM, and
// (3) enforce a per-user daily limit.
//
// Env vars (Vercel -> Project -> Settings -> Environment Variables):
//   GROQ_API_KEY      required to turn the AI on (without it the app just uses its exact, non-AI answers)
//   AI_MODEL          optional, default openai/gpt-oss-120b
//   AI_BASE_URL       optional, default https://api.groq.com/openai/v1   (any OpenAI-compatible provider)
//   AI_DAILY_LIMIT    optional, model calls per user per rolling 24h, default 300
// ---------------------------------------------------------------------------
const CHAT_PERIODS = ['today', 'yesterday', 'this_week', 'last_week', 'this_month', 'last_month', 'last_7_days', 'last_30_days', 'all'];
const CHAT_TOOLS = [
  { name: 'search_calls', description: 'List individual calls (latest first, max 10 shown plus the total). Filter by any combination of fields.',
    properties: { candidate: 'string', company: 'string', assignee: 'string', round: 'string: "1st" or "2nd+"', status: 'string', period: 'enum', date_from: 'YYYY-MM-DD', date_to: 'YYYY-MM-DD' } },
  { name: 'candidate_summary', description: 'Full history of one candidate: calls, rounds reached, companies, first 2nd+ round date, closures.', properties: { candidate: 'string' }, required: ['candidate'] },
  { name: 'company_summary', description: 'History of one company: calls, candidates, who handled them, rounds, last call date.', properties: { company: 'string', period: 'enum' }, required: ['company'] },
  { name: 'count_calls', description: 'Count calls grouped by something. Use for "how many" and "who has the most" questions.',
    properties: { group_by: 'enum: assignee|company|round|date|status|team', period: 'enum', date_from: 'YYYY-MM-DD', date_to: 'YYYY-MM-DD', assignee: 'string', company: 'string', round: 'string: "1st" or "2nd+"' }, required: ['group_by'] },
  { name: 'first_advanced', description: 'Candidates whose first-ever 2nd-or-later round happened in the period.', properties: { period: 'enum', date_from: 'YYYY-MM-DD', date_to: 'YYYY-MM-DD' } },
  { name: 'stale_candidates', description: 'Candidates with no new call for 14+ days (and not closed).', properties: { limit: 'integer' } },
  { name: 'board_overview', description: 'One day on the board: totals, by round, by person, unassigned and waiting-for-invite counts.', properties: { date: 'YYYY-MM-DD, default today' } },
  { name: 'closures_list', description: 'Recorded closures (offers). Filter by company, candidate or period.', properties: { company: 'string', candidate: 'string', period: 'enum' } },
];
function chatToolDefs() {
  return CHAT_TOOLS.map(t => {
    const props = {};
    Object.keys(t.properties).forEach(k => {
      const d = t.properties[k];
      if (d === 'enum') props[k] = { type: 'string', enum: CHAT_PERIODS };
      else if (d.startsWith('enum:')) props[k] = { type: 'string', enum: d.slice(5).trim().split('|') };
      else if (d === 'integer') props[k] = { type: 'integer' };
      else if (d === 'string') props[k] = { type: 'string' };
      else props[k] = { type: 'string', description: d };
    });
    return { type: 'function', function: { name: t.name, description: t.description, parameters: { type: 'object', properties: props, required: t.required || [] } } };
  });
}
function chatSystemPrompt(today) {
  return [
    'You are Ask Desk, a read-only assistant inside Coverage Desk, an interview-call scheduling dashboard used by a recruitment coordination team in India.',
    'Today is ' + today + '. Weeks run Monday to Sunday.',
    'ONLY use the tools to get facts. Never answer a data question from memory or guess. If a tool returns nothing, say so plainly.',
    'Use the "period" argument for relative dates (today, this_week, last_month...) instead of working out dates yourself.',
    'Candidate names in tool results appear as tokens like Candidate_3. Always refer to people by those exact tokens, never invent names. Staff and company names are real.',
    'Answer in 1-6 short lines. Give exact numbers from the tool results. Do not mention tools or JSON. You cannot change data; if asked to assign, delete or edit anything, say you can only look things up.',
    'If the question is unclear, ask one short clarifying question.',
  ].join('\n');
}
function sanitizeChatMessages(raw) {
  if (!Array.isArray(raw) || !raw.length || raw.length > 24) return null;
  const out = []; let total = 0;
  for (const m of raw) {
    if (!m || typeof m !== 'object') return null;
    const role = m.role;
    if (role !== 'user' && role !== 'assistant' && role !== 'tool') return null; // never accept a client-supplied 'system'
    const msg = { role };
    if (typeof m.content === 'string') { msg.content = m.content.slice(0, 6000); total += msg.content.length; }
    else if (m.content == null && role === 'assistant') msg.content = '';
    else return null;
    if (role === 'tool') {
      if (typeof m.tool_call_id !== 'string') return null;
      msg.tool_call_id = m.tool_call_id.slice(0, 80);
    }
    if (role === 'assistant' && Array.isArray(m.tool_calls)) {
      msg.tool_calls = [];
      for (const tc of m.tool_calls.slice(0, 4)) {
        if (!tc || !tc.function || typeof tc.function.name !== 'string' || !CHAT_TOOLS.some(t => t.name === tc.function.name)) return null;
        const args = typeof tc.function.arguments === 'string' ? tc.function.arguments.slice(0, 1500) : '{}';
        msg.tool_calls.push({ id: String(tc.id || '').slice(0, 80), type: 'function', function: { name: tc.function.name, arguments: args } });
      }
    }
    out.push(msg);
  }
  if (total > 30000) return null;
  if (out[out.length - 1].role === 'assistant') return null; // the model must be answering a user/tool turn
  return out;
}
async function handleChat(req, res, db, auth) {
  const model = process.env.AI_MODEL || 'openai/gpt-oss-120b';
  const limit = Math.max(1, Number(process.env.AI_DAILY_LIMIT || 300));
  if (req.method === 'GET') {
    return res.status(200).json({ configured: !!process.env.GROQ_API_KEY, model: process.env.GROQ_API_KEY ? model : '', dailyLimit: limit });
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const key = process.env.GROQ_API_KEY;
  if (!key) return res.status(503).json({ error: 'AI chat is not configured yet. Add GROQ_API_KEY in Vercel to turn it on.', code: 'not_configured' });

  const body = req.body || {};
  const messages = sanitizeChatMessages(body.messages);
  if (!messages) return res.status(400).json({ error: 'Invalid chat request.', code: 'bad_request' });
  const today = /^\d{4}-\d{2}-\d{2}$/.test(String(body.today || '')) ? body.today : new Date().toISOString().slice(0, 10);

  // per-user rolling 24h limit (the table is created on first use). If the check itself
  // can't run we fail open and log it — the provider's own free-tier cap still applies.
  try {
    await db.query('CREATE TABLE IF NOT EXISTS chat_usage (id BIGINT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(100) NOT NULL, used_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, INDEX idx_user_time (username, used_at))');
    const [rows] = await db.query('SELECT COUNT(*) AS cnt FROM chat_usage WHERE username = ? AND used_at > (NOW() - INTERVAL 24 HOUR)', [auth.username]);
    if (rows[0].cnt >= limit) return res.status(429).json({ error: 'Daily Ask Desk limit reached (' + limit + ' AI calls in 24 hours). Exact answers still work.', code: 'daily_limit' });
    await db.query('INSERT INTO chat_usage (username) VALUES (?)', [auth.username]);
    if (Math.random() < 0.02) db.query('DELETE FROM chat_usage WHERE used_at < (NOW() - INTERVAL 3 DAY)').catch(() => {});
  } catch (e) { console.error('chat_usage check failed (continuing):', e && e.message); }

  const payload = {
    model,
    messages: [{ role: 'system', content: chatSystemPrompt(today) }].concat(messages),
    tools: chatToolDefs(),
    tool_choice: 'auto',
    temperature: 0.1,
    max_tokens: 500,
  };
  if (/^openai\/gpt-oss/.test(model)) payload.reasoning_effort = 'low';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8500); // stay inside a serverless function's time budget
  let upstream, text;
  try {
    upstream = await fetch((process.env.AI_BASE_URL || 'https://api.groq.com/openai/v1').replace(/\/$/, '') + '/chat/completions', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key }, body: JSON.stringify(payload), signal: controller.signal,
    });
    text = await upstream.text();
  } catch (e) {
    clearTimeout(timer);
    if (e && e.name === 'AbortError') return res.status(504).json({ error: 'The AI took too long to answer. Try again, or use the exact answers.', code: 'timeout' });
    console.error('chat upstream error:', e && e.message);
    return res.status(502).json({ error: 'Could not reach the AI service.', code: 'upstream' });
  }
  clearTimeout(timer);
  if (upstream.status === 429) return res.status(429).json({ error: 'The AI is busy right now (free-tier rate limit). Wait a minute and try again.', code: 'busy' });
  if (upstream.status === 401 || upstream.status === 403) { console.error('chat: AI key rejected', upstream.status); return res.status(502).json({ error: 'The AI key was rejected. Check GROQ_API_KEY in Vercel.', code: 'bad_key' }); }
  let parsed; try { parsed = JSON.parse(text); } catch (e) { parsed = null; }
  if (!upstream.ok || !parsed || !parsed.choices || !parsed.choices[0] || !parsed.choices[0].message) {
    console.error('chat upstream bad response', upstream.status, String(text).slice(0, 300));
    return res.status(502).json({ error: 'The AI service returned an unexpected answer.', code: 'upstream' });
  }
  const m = parsed.choices[0].message;
  const message = { role: 'assistant', content: typeof m.content === 'string' ? m.content : '' };
  if (Array.isArray(m.tool_calls) && m.tool_calls.length) {
    message.tool_calls = m.tool_calls.slice(0, 4).map(tc => ({ id: String(tc.id || ''), type: 'function', function: { name: tc.function && tc.function.name, arguments: (tc.function && tc.function.arguments) || '{}' } }));
  }
  return res.status(200).json({ message, usage: parsed.usage || null });
}
module.exports = { handleChat, sanitizeChatMessages, chatToolDefs, chatSystemPrompt, CHAT_TOOLS };
