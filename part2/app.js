const express = require('express');
const session = require('express-session');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const walkRoutes = require('./routes/walkRoutes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: false,
}));

app.use('/api/users', userRoutes);
app.use('/api/walks', walkRoutes);

// Start server
app.listen(8081, () => {
  console.log('Server running at http://localhost:8081');
});
