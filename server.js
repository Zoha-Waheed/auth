const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON data
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error('Connection error:', err));

// Mock user data
const users = []; // Empty at the start

// Define a simple data schema
const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});

// Create a model from the schema
const Item = mongoose.model('Item', itemSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});

// Register user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check for duplicate username
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).send('Username already exists');
  }

  // Password validation (optional)
  if (password.length < 6) {
    return res.status(400).send('Password must be at least 6 characters long');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ id: Date.now(), username, password: hashedPassword });
  res.status(201).send('User registered successfully!');
});

// Login user
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

// Logout user
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Logout failed');
    }
    res.send('User logged out successfully!');
  });
});

// Fetch all items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Add item
app.post('/add-item', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).send({ message: 'Item added!', item });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Dashboard route (only accessible if logged in)
app.get('/dashboard', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send('Please log in first');
  }
  res.send(`Welcome to your dashboard, User ID: ${req.session.userId}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
