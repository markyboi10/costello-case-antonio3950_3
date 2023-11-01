var storedUserData = localStorage.getItem('jwtData');

if (storedUserData) {
    // Parse the JSON data
    var userData = JSON.parse(storedUserData);

    // Access and display the data
    document.getElementById('username').textContent = userData.given_name;
    document.getElementById('email').textContent = userData.email;
}
