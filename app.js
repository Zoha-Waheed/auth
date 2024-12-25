const apiUrl = 'http://localhost:5000'; // Backend URL

// Form and list references
const form = document.getElementById('add-item-form');
const itemList = document.getElementById('item-list');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const logoutBtn = document.getElementById('logout-btn');
const dashboardBtn = document.getElementById('dashboard-btn');

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

// Handle form submission to add items
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

// Handle login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      console.log('Login successful!');
      logoutBtn.style.display = 'inline-block';
      dashboardBtn.style.display = 'inline-block';
      loginForm.style.display = 'none';
    } else {
      alert('Login failed');
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
});

// Handle registration
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const regUsername = document.getElementById('reg-username').value;
  const regPassword = document.getElementById('reg-password').value;

  try {
    const response = await fetch(`${apiUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: regUsername, password: regPassword }),
    });

    const result = await response.text();
    alert(result);
  } catch (error) {
    console.error('Error registering user:', error);
  }
});

// Handle logout
const logout = async () => {
  try {
    const response = await fetch(`${apiUrl}/logout`, { method: 'POST' });
    const message = await response.text();
    console.log(message);

    // Hide logout and dashboard buttons, show login form
    logoutBtn.style.display = 'none';
    dashboardBtn.style.display = 'none';
    loginForm.style.display = 'block';
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

// Access dashboard (only if authenticated)
const accessDashboard = async () => {
  try {
    const response = await fetch(`${apiUrl}/dashboard`);
    const message = await response.text();

    if (response.ok) {
      alert(message); // Display dashboard content
    } else {
      alert('Please log in first!');
    }
  } catch (error) {
    console.error('Error accessing dashboard:', error);
  }
};

// Load items on page load
fetchItems();
