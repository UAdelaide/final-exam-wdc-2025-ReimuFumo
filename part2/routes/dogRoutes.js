const express = require('express');
const router = express.Router();
const db = require('../models/db'); // adjust to your actual DB connection


router.get('/', async (req, res) => {
  if (!req.session.user || req.session.user.role !== 'owner') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const ownerId = req.session.user.id;
    const [dogs] = await db.query('SELECT dog_id, name FROM Dogs WHERE owner_id = ?', [ownerId]);
    return res.json(dogs);// <-- add return here
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch dogs' }); // <-- add return here
  }
});


module.exports = router;
