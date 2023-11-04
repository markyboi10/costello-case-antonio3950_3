const express = require('express');
const app = express();
const port = 5007;
const fs = require('fs');
const path = require('path');

// Serve static files from a directory -> (HTML, CSS, JS)
app.use(express.static('Login'));

// Serve static files from the "UserProfile" directory
app.use('/UserProfile', express.static('UserProfile'));

// Listen on port 5007
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle the /Login endpoint
app.get('/Login', (req, res) => {
  res.sendFile(__dirname + '/Login/index.html');
});

// Endpoint for log ins
app.get('/initExistingUser', (req, res) => {
  const email = req.query.email || req.query.formEmail; // Get the user's email 
  // Extract the user's name from the email, needed to set json file correctly
  const name = email.split('@')[0];
  // Folder name of user jsons
  const usersFolder = 'Users';
  // Join dir path
  const jsonFileName = path.join(usersFolder, `${name}.json`); // Create the JSON file name

  // Check if the JSON file exists
  if (fs.existsSync(jsonFileName)) {
    // If the file exists, read its content
    const userData = JSON.parse(fs.readFileSync(jsonFileName, 'utf8'));
    res.json(userData);
  } else {
    // User is not found
    res.json({ error: 'User not found' });
  }
});

// Endpoint for sign ups
app.get('/initNewUser', (req, res) => {
  const email = req.query.formEmail; // Get the new user's email
  // Extract the user's name from the email, needed to set json file correctly
  const name = email.split('@')[0];
  // Folder name of user jsons
  const usersFolder = 'Users';
  // Join dir path
  const jsonFileName = path.join(usersFolder, `${name}.json`); // Create the JSON file name

  // Check if the JSON file exists
  if (fs.existsSync(jsonFileName)) {
    // User already exists
    res.json({ error: 'User already exists' });
  } else {
    // If the file doesn't exist, create a new JSON file and initialize it
    const userData = {
      name: email,
      videos: [],
      friends: [],
    };
    fs.writeFileSync(jsonFileName, JSON.stringify(userData, null, 2), 'utf8');
    res.json(userData);
  }
});