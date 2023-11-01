const express = require('express');
const app = express();
const port = 5007;

// Serve static files from a directory -> (HTML, CSS, JS)
app.use(express.static('Login'));

// Listen on port 5007
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle the /Login endpoint
app.get('/Login', (req, res) => {
    res.sendFile(__dirname + '/Login/index.html');
  });
  
// Handle the /UserProfile endpoint
app.use('/UserProfile', express.static('UserProfile'));

