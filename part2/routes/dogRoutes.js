const express = require('express');
const router = express.Router();
const db = require('../db'); // your DB connection

// GET /api/dogs - get dogs for logged-in owner
router.get('/', async (req, res) => {
  // Ensure user is logged in and is owner
  if (!req.session.user || req.session.user.role !== 'owner') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const ownerId = req.session.user.id;

    const [dogs] = await db.query(
      'SELECT dog_id, name FROM Dogs WHERE owner_id = ?',
      [ownerId]
    );

    res.json(dogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

module.exports = router;
