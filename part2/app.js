const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

const app = express();

// === Enable CORS with credentials ===
app.use(cors({
  origin: 'http://localhost:5500', // frontend port
  credentials: true// allow cookies/sessions
}));

// === Enable sessions ===
app.use(session({
  secret: 'your-secret-key', // change to a strong key
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }// true in HTTPS
}));

// === Body parsing and static files ===
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// === Routes ===
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
const dogRoutes = 

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;
