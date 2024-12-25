const apiUrl = 'http://localhost:5000'; // Backend URL

// Form and list references
const form = document.getElementById('add-item-form');
const itemList = document.getElementById('item-list');

// Fetch and display all items
const fetchItems = async () => {
  try {
    const response = await fetch(`${apiUrl}/items`);
    const items = await response.json();

    // Clear existing list
    itemList.innerHTML = '';

    // Add items to the list
    items.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} (Quantity: ${item.quantity})`;
      itemList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent page reload

  // Get form data
  const name = document.getElementById('name').value;
  const quantity = document.getElementById('quantity').value;

  // Send data to backend
  try {
    const response = await fetch(`${apiUrl}/add-item`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, quantity }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result.message);

      // Refresh the item list
      fetchItems();

      // Clear form fields
      form.reset();
    } else {
      console.error('Error adding item:', response.statusText);
    }
  } catch (error) {
    console.error('Error adding item:', error);
  }
});

const login = async () => {
  const response = await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'JohnDoe', password: 'password123' })
  });

  if (response.ok) {
    console.log('Login successful!');
  } else {
    console.log('Login failed');
  }
};
const registerUser = async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('http://localhost:5000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const message = await response.text();
  alert(message);
};


const logout = async () => {
  const response = await fetch('http://localhost:5000/logout', { method: 'POST' });
  const message = await response.text();
  console.log(message);
};

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    next(); // User is authenticated, proceed
  } else {
    res.status(401).send('Unauthorized: Please log in.');
  }
};


const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send('Access denied');
  }

  try {
    const verified = jwt.verify(token, 'your-secret-key'); // Replace with your secret key
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};


const accessDashboard = async () => {
  const response = await fetch('http://localhost:5000/dashboard');
  const message = await response.text();

  if (response.ok) {
    alert(message); // Display dashboard content
  } else {
    alert('Please log in first!');
  }
};


// Load items on page load
fetchItems();
