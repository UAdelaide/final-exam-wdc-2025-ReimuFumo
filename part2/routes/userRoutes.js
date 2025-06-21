const express = require('express');
const router = express.Router();
const db = require('../models/db');

// POST login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query(`
      SELECT user_id, username, role, password_hash
      FROM Users
      WHERE email = ?
    `, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];

    // For development: plaintext password comparison
    if (user.password_hash !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // ✅ Store user in session
    req.session.user = {
      id: user.user_id,
      username: user.username,
      role: user.role
    };

    res.json({ success: true, role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  res.json(req.session.user);
});

module.exports = router;
