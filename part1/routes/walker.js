var express = require('express');
var router = express.Router();
var db = require('../db');



router.get('/dogs', async (req,res) => {
   const [rows] = await db.query(`
  SELECT d.name, d.size, u.username AS owner
  FROM Dogs d
  JOIN Users u ON d.owner_id = u.user_id
`);
        res.json(rows);
});

router.get('/walkrequest/open', async (req, res) => {
  const [rows] = await db.query(`
    SELECT wr.request_id, d.name AS dog_name, wr.requested_time, wr.duration_minutes, wr.location, u.username AS owner_username
    FROM WalkRequests wr
    JOIN Dogs d ON wr.dog_id = d.dog_id
    JOIN Users u ON d.owner_id = u.user_id
    JOIN Users u ON m.BuyerID = u.UserID
    WHERE wr.status = 'open'
  `);
  res.json(rows);
});

router.get('/walkers/summary', async (req, res) => {
  const [rows] = await db.query(`
    SELECT m.MessageText, m.SentAt, bi.Title, u.Name AS BuyerName
    FROM Messages m
    JOIN BookListings bl ON m.BookID = bl.BookID
    JOIN BookInfo bi ON bl.BookInfoID = bi.BookInfoID
    JOIN Users u ON m.BuyerID = u.UserID
    WHERE m.SellerID = ?
    ORDER BY m.SentAt DESC
  `, [CURRENT_BUYER_ID]);
  res.json(rows);
});



module.exports = router;