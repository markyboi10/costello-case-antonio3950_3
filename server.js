const express = require('express');
const app = express();
const port = 5007;
const fs = require('fs');
const path = require('path');

// In order to read the body from the POST request
app.use(express.json());

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
    // Add the new user's email to the allusers.json file
    const allUsersFileName = 'AllUsers/allusers.json';
    let allUsers = [];

    if (fs.existsSync(allUsersFileName)) {
      // If the allusers.json file exists, read its content
      const allUsersData = fs.readFileSync(allUsersFileName, 'utf8');
      allUsers = JSON.parse(allUsersData);
    }

    // Append the new email to the array of all users
    allUsers.push(email);

    // Write the updated all users list back to allusers.json
    fs.writeFileSync(allUsersFileName, JSON.stringify(allUsers, null, 2), 'utf8');
    res.json(userData);
  }
});

// Handle user google login
app.get('/initUser', (req, res) => {
  const email = req.query.email || req.query.formEmail; // Get the user's email from the request query
  console.log(email);
  // Extract the user's name from the email
  const name = email.split('@')[0];

  const usersFolder = 'Users';
  const jsonFileName = path.join(usersFolder, `${name}.json`); // Create the JSON file name

  // Check if the JSON file exists
  if (fs.existsSync(jsonFileName)) {
    // If the file exists, read its content
    const userData = JSON.parse(fs.readFileSync(jsonFileName, 'utf8'));
    console.log('User data:', userData);
    res.json(userData);
  } else {
    // If the file doesn't exist, create a new JSON file and initialize it
    const userData = {
      name: email,
      videos: [],
      friends: [],
    };
    fs.writeFileSync(jsonFileName, JSON.stringify(userData, null, 2), 'utf8');
    // Add the new user's email to the allusers.json file
    const allUsersFileName = 'AllUsers/allusers.json';
    let allUsers = [];

    if (fs.existsSync(allUsersFileName)) {
      // If the allusers.json file exists, read its content
      const allUsersData = fs.readFileSync(allUsersFileName, 'utf8');
      allUsers = JSON.parse(allUsersData);
    }

    // Append the new email to the array of all users
    allUsers.push(email);

    // Write the updated all users list back to allusers.json
    fs.writeFileSync(allUsersFileName, JSON.stringify(allUsers, null, 2), 'utf8');
    res.json(userData);
  }
});

// Handle requesting a user's site
app.get("/getUser", (req, res) => {
  const email = req.query.selectedEmail; // Get the new user's email
  // Extract the user's name from the email, needed to set json file correctly
  const name = email.split('@')[0];
  // Folder name of user jsons
  const usersFolder = 'Users';
  // Join dir path
  const jsonFileName = path.join(usersFolder, `${name}.json`); // Create the JSON file name

  // Check if the JSON file exists
  if (fs.existsSync(jsonFileName)) {
    const userData = JSON.parse(fs.readFileSync(jsonFileName, 'utf8'));
    res.json(userData);
  } else {
    // User is not found
    res.json({ error: 'User not found' });
  }

});

// Handle requesting a user's site
app.get("/getAllUsers", (req, res) => {
  const allUsersFileName = 'AllUsers/allusers.json';

  if (fs.existsSync(allUsersFileName)) {
    // If the allusers.json file exists, read its content
    const allUsersData = fs.readFileSync(allUsersFileName, 'utf8');
    allUsers = JSON.parse(allUsersData);
    console.log("test");
    console.log(allUsers);
    res.json(allUsers);
  } else {
    res.json({ error: 'Error in returning all users' });
  }

});

app.post("/add-video", (req, res) => {
  let { videoUrl, videoDescription, userName } = req.body;

  userName = userName.split("@")[0];
  const jsonFileName = path.join("Users", `${userName}.json`); // Create the JSON file name

  if (fs.existsSync(jsonFileName)) {
    const userData = JSON.parse(fs.readFileSync(jsonFileName, "utf8"));
    const videoData = {
      src: videoUrl,
      description: videoDescription,
      comments: [],
    };
    userData.videos.push(videoData);
    fs.writeFileSync(jsonFileName, JSON.stringify(userData, null, 2), "utf8");

    res.sendStatus(200);
  } else {
    // User is not found
    res.json({ error: "User not found" });
  }
});