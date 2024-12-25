const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Middleware for cookies
app.use(cookieParser());

// Set a cookie
app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'JohnDoe', { httpOnly: true });
  res.send('Cookie has been set!');
});

// Get a cookie
app.get('/get-cookie', (req, res) => {
  const username = req.cookies.username;
  res.send(`Cookie retrieved: ${username}`);
});

// Clear a cookie
app.get('/clear-cookie', (req, res) => {
  res.clearCookie('username');
  res.send('Cookie has been cleared!');
});

app.listen(5000, () => console.log('Server running on port 5000'));
