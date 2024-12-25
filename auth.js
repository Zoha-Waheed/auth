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

app.listen(5000, () => console.log('Server running on port 5000'));
