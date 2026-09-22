// api/auth.js
// A completely separate serverless function from api/data.js, dedicated only
// to login and user management. Deployed on Vercel at /api/auth, routed by
// ?action=whoami|users. Keeping this isolated from data.js means it has its
// own deployment history — nothing that happens to data.js can affect this file.
//
// Uses the SAME environment variables as data.js (set once, shared by both):
//   DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_CA_CERT (optional)
//   ADMIN_PASSWORD (optional) — master password, always logs in as admin.

const mysql = require('mysql2/promise');
const crypto = require('crypto');

// FIX: this file used to hash every password with plain SHA-256 and compare
// that directly in the SQL query. But api/data.js (the file that actually
// creates and resets accounts via the Users panel) hashes with scrypt,
// stored as "scrypt:<salt>:<hash>". A SHA-256 hex digest can never equal
// that string, so any account created or password-reset through the app
// could never log in here — the login screen would reject the correct
// password every time. hashPwStrong/verifyPassword below are copied
// verbatim from api/data.js so both files agree on what a valid password
// looks like. Legacy plain-SHA256 accounts (from before this fix existed)
// still log in fine too — verifyPassword recognizes both formats.
function hashPwStrong(pw) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(String(pw), salt, 64).toString('hex');
  return `scrypt:${salt}:${hash}`;
}
function hashPwLegacySha256(pw) {
  return crypto.createHash('sha256').update(String(pw)).digest('hex');
}
function verifyPassword(pw, storedHash) {
  if (!storedHash) return { valid: false, needsUpgrade: false };
  if (storedHash.startsWith('scrypt:')) {
    const [, salt, hashHex] = storedHash.split(':');
    const candidate = crypto.scryptSync(String(pw), salt, 64);
    const stored = Buffer.from(hashHex, 'hex');
    const valid = candidate.length === stored.length && crypto.timingSafeEqual(candidate, stored);
    return { valid, needsUpgrade: false };
  }
  // Legacy plain-SHA256 hash — still recognized so an old account logs in
  // correctly; api/data.js transparently upgrades it to scrypt once someone
  // logs in with it successfully (mirrored below for consistency, though
  // in practice most accounts get upgraded via api/data.js first).
  const legacy = hashPwLegacySha256(pw);
  const a = Buffer.from(legacy, 'utf8'), b = Buffer.from(String(storedHash), 'utf8');
  const valid = a.length === b.length && crypto.timingSafeEqual(a, b);
  return { valid, needsUpgrade: valid };
}
function newId() {
  return crypto.randomBytes(6).toString('hex');
}

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
        : { rejectUnauthorized: false },
    });
  }
  return pool;
}

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password, x-username, x-password');
}

async function authenticate(req, db) {
  if (!process.env.ADMIN_PASSWORD) return { ok: true, username: null, role: 'admin' };
  const adminPw = req.headers['x-admin-password'];
  if (adminPw && adminPw === process.env.ADMIN_PASSWORD) {
    return { ok: true, username: 'admin', role: 'admin' };
  }
  const username = req.headers['x-username'];
  const password = req.headers['x-password'];
  if (username && password) {
    try {
      // FIX: used to be `WHERE username = ? AND password_hash = ?` with the
      // hash computed as plain SHA-256 — that comparison happened inside the
      // SQL query itself, so it could only ever match a legacy-format hash.
      // Now: look the account up by username alone (same query shape as
      // api/data.js's own authenticate(), including selecting `id` — that's
      // what the update-by-id below needs), then verify the password in
      // code with the same scrypt-aware check.
      const [rows] = await db.query(
        'SELECT id, username, role, password_hash FROM users WHERE username = ?',
        [username]
      );
      if (rows.length) {
        const { valid, needsUpgrade } = verifyPassword(password, rows[0].password_hash);
        if (valid) {
          if (needsUpgrade) {
            // Same self-healing upgrade api/data.js does — never blocks the
            // login itself on this succeeding.
            db.query('UPDATE users SET password_hash = ? WHERE id = ?', [hashPwStrong(password), rows[0].id]).catch(()=>{});
          }
          return { ok: true, username: rows[0].username, role: rows[0].role };
        }
      }
    } catch (e) { /* users table may not exist yet — treat as unauthenticated */ }
  }
  return { ok: false };
}

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const action = req.query.action;
  const db = getPool();
  const auth = await authenticate(req, db);

  if (action === 'whoami') {
    if (!auth.ok) return res.status(401).json({ error: 'Unauthorized' });
    return res.status(200).json({ username: auth.username, role: auth.role });
  }

  if (action === 'users') {
    if (!auth.ok) return res.status(401).json({ error: 'Unauthorized' });
    if (req.method === 'POST' && auth.role !== 'admin') {
      return res.status(403).json({ error: 'Read-only account — admin permission required.' });
    }
    try {
      if (req.method === 'GET') {
        const [rows] = await db.query('SELECT id, username, role FROM users ORDER BY username');
        return res.status(200).json({ rows });
      }
      if (req.method === 'POST') {
        const { action: userAction, id, username, password, role } = req.body || {};
        // Same safe-fallback as api/data.js: an unrecognized role value
        // becomes read-only 'user' rather than silently keeping whatever
        // was passed in.
        const safeRole = (r) => (r === 'admin' || r === 'team_lead') ? r : 'user';
        if (userAction === 'create') {
          if (!username || !password) return res.status(400).json({ error: 'username and password required' });
          try {
            await db.query(
              'INSERT INTO users (id, username, password_hash, role) VALUES (?,?,?,?)',
              [newId(), username, hashPwStrong(password), safeRole(role)]
            );
            return res.status(200).json({ ok: true });
          } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'That username is already taken.' });
            throw e;
          }
        }
        if (userAction === 'setRole') {
          await db.query('UPDATE users SET role = ? WHERE id = ?', [safeRole(role), id]);
          return res.status(200).json({ ok: true });
        }
        if (userAction === 'resetPassword') {
          if (!password) return res.status(400).json({ error: 'password required' });
          await db.query('UPDATE users SET password_hash = ? WHERE id = ?', [hashPwStrong(password), id]);
          return res.status(200).json({ ok: true });
        }
        if (userAction === 'delete') {
          await db.query('DELETE FROM users WHERE id = ?', [id]);
          return res.status(200).json({ ok: true });
        }
        return res.status(400).json({ error: 'Unknown action. Use create|setRole|resetPassword|delete' });
      }
      return res.status(405).json({ error: 'Method not allowed' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(400).json({ error: 'Unknown action. Use ?action=whoami|users' });
};
