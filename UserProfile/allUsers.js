
function getAllUsersNow() {
    var storedAllUsers = localStorage.getItem('allUserData');

    if (storedAllUsers) {
        // Parse the JSON data
        var allUsers = JSON.parse(storedAllUsers);
        console.log("All the users are here" + allUsers);
        // Assuming you have already parsed the JSON data into the allUsers array
        // Assuming you have already parsed the JSON data into the allUsers array

        var dropdownMenu = document.getElementById("testy"); // Get the dropdown menu element
        console.log(dropdownMenu);
        // Loop through the allUsers array and create list items
        allUsers.forEach(function (email) {
            // Extract the username from the email address
            var username = email;

            var listItem = document.createElement("li"); // Create a new list item
            var anchor = document.createElement("a"); // Create an anchor element
            anchor.textContent = username; // Set the text content of the anchor to the extracted username
            anchor.href = "#"; // Set the href attribute as needed

            listItem.appendChild(anchor); // Append the anchor to the list item
            dropdownMenu.appendChild(listItem); // Append the list item to the dropdown menu
        });


    }
}