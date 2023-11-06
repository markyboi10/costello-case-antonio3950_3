// // Adds users to 'All Users' list (found in UserProfile index.html)


// function getAllUsersNow() {
//     // Grab data with key word allUserData from local storage
//     var storedAllUsers = localStorage.getItem('allUserData');
//     // If not null
//     if (storedAllUsers) {
//         // Parse the data
//         var allUsers = JSON.parse(storedAllUsers);
//         var dropdownMenu = document.getElementById("all_users_dd"); // Get the dropdown menu element

//         dropdownMenu.innerHTML = "";
//         // Loop through the allUsers array and create list items
//         allUsers.forEach(function (email) {
//             var listItem = document.createElement("li"); // Create a new list item
//             var anchor = document.createElement("a"); // Create an anchor element
//             anchor.textContent = email; // Set the text content of the anchor to the email
//             anchor.href = "#"; // Set the href attribute as needed

//             listItem.appendChild(anchor); // Append the anchor to the list item
//             dropdownMenu.appendChild(listItem); // Append the list item to the dropdown menu
//         });
//     }
// }

// // GET request to the getAllUsers endpoint -> Sets local storage before letting getAllUsersNow call it
// function decodeAllUsers() {
//     fetch(`/getAllUsers`)
//         .then(response => response.json())
//         .then(data => {

//             // If endpoint response is incorrect
//             if (data.error) {
//                 console.log(data.error);
//             } else {
//                 /* 
//                  * Otherwise, set the data to local storage so it can be accessed 
//                  * by UserProfile where it is navigating to
//                 */
//                 localStorage.setItem('allUserData', JSON.stringify(data));
//                 getAllUsersNow();
//             }
//         })
//         .catch(error => {
//             console.error('User failed to be added', error);
//         });
// }
// setInterval(decodeAllUsers, 10000);
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
                console.log("The data: " + data)
                updateUI(data);
            }
        })
        .catch(error => {
            console.error('User failed to be added', error);
        });
}

// Update ALL USERS code using sse and normal endpoint

// Open an SSE connection to the server ednpoint
const eventSource = new EventSource('/sse-routine-new-users');

eventSource.onmessage = handleSSE;

// Function to handle SSE messages
function handleSSE(event) {
    const newData = JSON.parse(event.data); // data from endpoint
    updateUI(newData); // Call update UI with the new data
}

eventSource.onerror = (error) => {
    // Handle errors such as lost connection
    console.error('SSE Error', error);
};

// Grab the id of the dropdown menu for all users
const dropdownMenu = document.getElementById("all_users_dd");

// Update the index html with the newData as input
function updateUI(newData) {
    dropdownMenu.innerHTML = ""; // Clear list so it is not beind duplicated
    newData.forEach(function (email) {
        const listItem = document.createElement("li"); // Create a new list item
        const anchor = document.createElement("a"); // Create an anchor element
        anchor.textContent = email; // Set the text content of the anchor to the email
        anchor.href = "#"; // Set the href attribute as needed

        listItem.appendChild(anchor); // Append the anchor to the list item
        dropdownMenu.appendChild(listItem); // Append the list item to the dropdown menu
    });
}