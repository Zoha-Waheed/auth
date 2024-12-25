const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();

// Middleware
app.use(express.json());
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

// Mock user data
const users = [{ id: 1, username: 'JohnDoe', password: '$2b$10$eBEx1...' }]; // Hash of 'password123'


/* Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user.id; // Set session
    res.send('Login successful!');
  } else {
    res.status(401).send('Invalid username or password');
  }
});



/* Protected route
app.get('/dashboard', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send('Please log in first');
  }
  res.send('Welcome to your dashboard!');
});
*/


app.listen(5000, () => console.log('Server running on port 5000'));
