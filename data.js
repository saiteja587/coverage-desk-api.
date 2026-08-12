// api/data.js
// One serverless function, routed by ?resource=calls|roster|notes|dates
// Deployed on Vercel. Reads DB credentials from environment variables —
// never hard-code them here.
//
// Env vars needed (set in Vercel dashboard -> Project -> Settings -> Environment Variables):
//   DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_CA_CERT (optional, see below)

const mysql = require('mysql2/promise');

let pool;
function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 5,
      ssl: process.env.DB_CA_CERT
        ? { ca: process.env.DB_CA_CERT.replace(/\\n/g, '\n') }
        : { rejectUnauthorized: false }, // Aiven requires TLS
    });
  }
  return pool;
}

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');
}

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Simple shared-password gate. Set ADMIN_PASSWORD in Vercel's environment
  // variables to require it on every request. If ADMIN_PASSWORD isn't set,
  // the app stays open (backward compatible, no login enforced).
  if (process.env.ADMIN_PASSWORD) {
    const provided = req.headers['x-admin-password'];
    if (provided !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  const resource = req.query.resource;
  const db = getPool();

  try {
    if (resource === 'calls') return await handleCalls(req, res, db);
    if (resource === 'roster') return await handleRoster(req, res, db);
    if (resource === 'notes') return await handleNotes(req, res, db);
    if (resource === 'dates') return await handleDates(req, res, db);
    if (resource === 'finalized') return await handleFinalized(req, res, db);
    return res.status(400).json({ error: 'Unknown resource. Use ?resource=calls|roster|notes|dates|finalized' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

// ---------- calls ----------
async function handleCalls(req, res, db) {
  if (req.method === 'GET') {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'date query param required' });
    const [rows] = await db.query('SELECT * FROM calls WHERE call_date = ? ORDER BY created_at', [date]);
    const mapped = rows.map(rowToCall);
    return res.status(200).json({ rows: mapped });
  }
  if (req.method === 'POST') {
    const { date, rows } = req.body;
    if (!date || !Array.isArray(rows)) return res.status(400).json({ error: 'date and rows[] required' });
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      await conn.query('DELETE FROM calls WHERE call_date = ?', [date]);
      for (const r of rows) {
        await conn.query(
          `INSERT INTO calls (id, call_date, time_text, candidate, company, round_text, duration, is_woi, assignee, country, doubts_json, raw_text)
           VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
          [r.id, date, r.time||'', r.candidate||'', r.company||'', r.round||'', r.duration||'',
           r.woi?1:0, r.assignee||'', r.country||'USA', JSON.stringify(r.doubts||[]), r.raw||'']
        );
      }
      await conn.commit();
      return res.status(200).json({ ok: true, count: rows.length });
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
function rowToCall(row) {
  return {
    id: row.id,
    time: row.time_text,
    candidate: row.candidate,
    company: row.company,
    round: row.round_text,
    duration: row.duration,
    woi: !!row.is_woi,
    assignee: row.assignee,
    country: row.country,
    doubts: safeParse(row.doubts_json, []),
    raw: row.raw_text || '',
  };
}
function safeParse(text, fallback) {
  try { return JSON.parse(text); } catch (e) { return fallback; }
}

// ---------- roster ----------
async function handleRoster(req, res, db) {
  if (req.method === 'GET') {
    const [rows] = await db.query('SELECT * FROM roster ORDER BY team, name');
    return res.status(200).json({
      rows: rows.map(r => ({ id: r.id, name: r.name, team: r.team, advanced: !!r.is_advanced })),
    });
  }
  if (req.method === 'POST') {
    const { rows } = req.body;
    if (!Array.isArray(rows)) return res.status(400).json({ error: 'rows[] required' });
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      await conn.query('DELETE FROM roster');
      for (const p of rows) {
        await conn.query(
          'INSERT INTO roster (id, name, team, is_advanced) VALUES (?,?,?,?)',
          [p.id, p.name, p.team, p.advanced ? 1 : 0]
        );
      }
      await conn.commit();
      return res.status(200).json({ ok: true, count: rows.length });
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

// ---------- notes ----------
async function handleNotes(req, res, db) {
  if (req.method === 'GET') {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'date query param required' });
    const [rows] = await db.query('SELECT id, note_text AS text FROM notes WHERE note_date = ? ORDER BY created_at', [date]);
    return res.status(200).json({ rows });
  }
  if (req.method === 'POST') {
    const { date, rows } = req.body;
    if (!date || !Array.isArray(rows)) return res.status(400).json({ error: 'date and rows[] required' });
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      await conn.query('DELETE FROM notes WHERE note_date = ?', [date]);
      for (const n of rows) {
        await conn.query('INSERT INTO notes (id, note_date, note_text) VALUES (?,?,?)', [n.id, date, n.text]);
      }
      await conn.commit();
      return res.status(200).json({ ok: true, count: rows.length });
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

// ---------- finalized flag ----------
async function handleFinalized(req, res, db) {
  if (req.method === 'GET') {
    const { date } = req.query;
    const [rows] = await db.query('SELECT finalized FROM day_status WHERE the_date = ?', [date]);
    return res.status(200).json({ finalized: rows.length ? !!rows[0].finalized : false });
  }
  if (req.method === 'POST') {
    const { date, finalized } = req.body;
    await db.query(
      'INSERT INTO day_status (the_date, finalized) VALUES (?,?) ON DUPLICATE KEY UPDATE finalized = ?',
      [date, finalized ? 1 : 0, finalized ? 1 : 0]
    );
    return res.status(200).json({ ok: true });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

// ---------- distinct dates (for the repeat-candidate notification scan) ----------
async function handleDates(req, res, db) {
  const [rows] = await db.query('SELECT DISTINCT call_date FROM calls ORDER BY call_date');
  return res.status(200).json({ dates: rows.map(r => formatDate(r.call_date)) });
}
function formatDate(d) {
  const dt = new Date(d);
  return dt.toISOString().slice(0, 10);
}
