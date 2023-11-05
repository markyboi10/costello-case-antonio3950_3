// Adds users to 'All Users' list (found in UserProfile index.html)


function getAllUsersNow() {
    // Grab data with key word allUserData from local storage
    var storedAllUsers = localStorage.getItem('allUserData');
    // If not null
    if (storedAllUsers) {
        // Parse the data
        var allUsers = JSON.parse(storedAllUsers);
        var dropdownMenu = document.getElementById("all_users_dd"); // Get the dropdown menu element

        dropdownMenu.innerHTML = "";
        // Loop through the allUsers array and create list items
        allUsers.forEach(function (email) {
            var listItem = document.createElement("li"); // Create a new list item
            var anchor = document.createElement("a"); // Create an anchor element
            anchor.textContent = email; // Set the text content of the anchor to the email
            anchor.href = "#"; // Set the href attribute as needed

            listItem.appendChild(anchor); // Append the anchor to the list item
            dropdownMenu.appendChild(listItem); // Append the list item to the dropdown menu
        });
    }
}

// GET request to the getAllUsers endpoint -> Sets local storage before letting getAllUsersNow call it
function decodeAllUsers() {
    fetch(`/getAllUsers`)
        .then(response => response.json())
        .then(data => {

            // If endpoint response is incorrect
            if (data.error) {
                console.log(data.error);
            } else {
                /* 
                 * Otherwise, set the data to local storage so it can be accessed 
                 * by UserProfile where it is navigating to
                */
                localStorage.setItem('allUserData', JSON.stringify(data));
                getAllUsersNow();
            }
        })
        .catch(error => {
            console.error('User failed to be added', error);
        });
}
setInterval(decodeAllUsers, 10000);