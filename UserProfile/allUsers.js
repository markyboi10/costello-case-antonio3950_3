// Function to get the user info to visit other user's page
function visitOtherUser(userName) {
  fetch(`/getUser?selectedEmail=${userName}`)
    .then((response) => response.json())
    .then((data) => {
      // If endpoint response is incorrect
      if (data.error) {
        console.log(data.error);
      } else {
        localStorage.setItem("userData", JSON.stringify(data));
        window.location.href = "/UserProfile/index.html";
      }
    })
    .catch((error) => {
      console.error("User failed to be added", error);
    });
}
function addRemoveFriend() {
  const friendUsername = document.getElementById("username").textContent;
  const friendEmail = JSON.parse(localStorage.getItem("userData")).name;
  const userName = localStorage.getItem("loginEmail").split("@")[0];
  if(document.getElementById("add-friend-btn").innerHTML.toLowerCase() == "add friend")
    fetch("/add-friend", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        friendUsername,
      }),
    }).then(() => {
      addToFriendsList(friendUsername, friendEmail); // Append the list item to the dropdown menu
      document.getElementById("add-friend-btn").innerHTML = "Remove Friend";
    });
  else
    fetch("/remove-friend", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        friendUsername,
      }),
    }).then(() => {
      removeFromFriendsList(friendUsername); // Append the list item to the dropdown menu
      document.getElementById("add-friend-btn").innerHTML = "Add Friend";
    });
}

function addToFriendsList(friendUsername, email) {
  var dropdownMenu = document.getElementById("friends-list"); // Get the dropdown menu element

  // Loop through the allUsers array and create list items
  var listItem = document.createElement("li"); // Create a new list item

  listItem.addEventListener("click", () => visitOtherUser(email)); // Add an event listener with a callback to visit other user when clicking the user name
  var anchor = document.createElement("a"); // Create an anchor element
  anchor.textContent = friendUsername; // Set the text content of the anchor to the email, split just show the username before the @
  anchor.href = "#"; // Set the href attribute as needed

  listItem.appendChild(anchor); // Append the anchor to the list item
  dropdownMenu.appendChild(listItem);
}

function removeFromFriendsList(friendUsername) {
  var dropdownMenu = document.getElementById("friends-list"); // Get the dropdown menu element

  // For each friend in the drop down menu:
  for(var friendIndex in dropdownMenu.childNodes) {
    var friendLI = dropdownMenu.childNodes[friendIndex];
    // If we find the friend, remove it.
    try {
    if(friendLI.firstChild.textContent == friendUsername)
      dropdownMenu.removeChild(friendLI);
    } catch(error) {}
  }
}

function decodeAllUsers() {
  fetch(`/getAllUsers`)
    .then((response) => response.json())
    .then((data) => {
      // If endpoint response is incorrect
      if (data.error) {
        console.log(data.error);
      } else {
        /*
         * Otherwise, set the data to local storage so it can be accessed
         * by UserProfile where it is navigating to
         */
        console.log("The data: " + data);
        updateUI(data);
      }
    })
    .catch((error) => {
      console.error("User failed to be added", error);
    });
}

// Update ALL USERS code using sse and normal endpoint

// Open an SSE connection to the server ednpoint
const eventSource = new EventSource("/sse-routine-new-users");

eventSource.onmessage = handleSSE;

// Function to handle SSE messages
function handleSSE(event) {
    const newData = JSON.parse(event.data); // data from endpoint
    updateUI(newData); // Call update UI with the new data
    getNewPageData();
}

eventSource.onerror = (error) => {
  // Handle errors such as lost connection
  console.error("SSE Error", error);
};

// Grab the id of the dropdown menu for all users
const dropdownMenu = document.getElementById("all_users_dd");

// Update the index html with the newData as input
function updateUI(newData) {
  dropdownMenu.innerHTML = ""; // Clear list so it is not being duplicated
  newData.forEach(function (email) {
    const listItem = document.createElement("li"); // Create a new list item
    listItem.addEventListener("click", () => visitOtherUser(email));
    const anchor = document.createElement("a"); // Create an anchor element
    anchor.textContent = email.split("@")[0]; // Set the text content of the anchor to the email
    anchor.href = "#"; // Set the href attribute as needed

    listItem.appendChild(anchor); // Append the anchor to the list item
    dropdownMenu.appendChild(listItem); // Append the list item to the dropdown menu
  });
}
