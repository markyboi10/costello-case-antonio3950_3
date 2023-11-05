var storedUserData = localStorage.getItem('userData');

if (storedUserData) {
    // Parse the JSON data
    var userData = JSON.parse(storedUserData);

    // Access and display the data
    document.getElementById('username').textContent = userData.name;
    
}
