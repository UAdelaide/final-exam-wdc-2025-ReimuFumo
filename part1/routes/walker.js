var express = require('express');
var router = express.Router();
var db = require('../db');



router.get('/dogs', async (req,res) => {
   const [rows] = await db.query(`
  SELECT bl.BookID, bi.Title, u.Name AS SellerName, bl.SellerID
  FROM BookListings bl
  JOIN BookInfo bi ON bl.BookInfoID = bi.BookInfoID
  JOIN Users u ON bl.SellerID = u.UserID
`);
        res.json(rows);
});

router.get('/messages', async (req, res) => {
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


router.post('/messages', async (req,res) => {
    const { bookID, sellerID, message } = req.body;
    await db.query(`
        Insert Into Messages (BuyerID, SellerID, BookID, MessageText, SentAt)
        Values (?, ?, ?, ?, Now())
        `, [CURRENT_BUYER_ID, sellerID, bookID, message]);
    res.status(201).json({ message: 'Message sent!' });
});
module.exports = router;