const express = require('express');
const router = express.Router();
const db = require('../db'); // adjust to your actual DB connection

router.get('/', async (req, res) => {
  if (!req.session.user || req.session.user.role !== 'owner') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const ownerId = req.session.user.id;
    const [dogs] = await db.query('SELECT dog_id, name FROM Dogs WHERE owner_id = ?', [ownerId]);
    res.json(dogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

module.exports = router;
