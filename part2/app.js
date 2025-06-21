const express = require('express');
const session = require('express-session');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'walkersecret',
  resave: false,
  saveUninitialized: false,
}));

app.use('/api/users', userRoutes);

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
