var express = require('express');
var router = express.Router();
var db = require('../db');



router.get('/dogs', async (req,res) => {
   const [rows] = await db.query(`
  SELECT bi.name, u.Name AS SellerName, bl.SellerID
  FROM Dogs d
  JOIN BookInfo bi ON bl.BookInfoID = bi.BookInfoID
  JOIN Users u ON bl.SellerID = u.UserID
`);
        res.json(rows);
});

router.get('/walkrequest/open', async (req, res) => {
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