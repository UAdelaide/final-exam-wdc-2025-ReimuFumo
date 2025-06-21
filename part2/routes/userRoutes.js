const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(`
      SELECT user_id, username, password_hash, role FROM Users WHERE username = ?
    `, [username]);

    const user = rows[0];

    if (!user || user.password_hash !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.user = {
      id: user.user_id,
      username: user.username,
      role: user.role
    };

    res.json({ message: 'Login successful', role: user.role });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  res.json(req.session.user);
});

module.exports = router;
