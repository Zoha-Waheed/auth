
const express = require('express');
const session = require('express-session');
const app = express();

// Middleware for sessions
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 } // Session expires after 1 minute
}));

// Set session data
app.get('/set-session', (req, res) => {
  req.session.username = 'JohnDoe';
  res.send('Session data has been set!');
});

// Get session data
app.get('/get-session', (req, res) => {
  const username = req.session.username;
  res.send(`Session data retrieved: ${username}`);
});

// Destroy session
app.get('/destroy-session', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Error destroying session');
    }
    res.send('Session destroyed successfully!');
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
