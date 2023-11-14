const loginEmail = localStorage.getItem("loginEmail");
const data = localStorage.getItem("userData");
let userEmail;

if (loginEmail && data) {
  createFriendsList(loginEmail);

  userEmail = JSON.parse(data).name;

  if (loginEmail === userEmail) {
    // User is on their own page
    document.getElementById("add-friend-btn").style.display = "none";
    document.getElementById("add-video-form").style.display = "visible";
    document.title = "My Profile";
  } else {
    document.getElementById("add-friend-btn").style.display = "visible";
    document.getElementById("add-video-form").style.display = "none";
    document.title = userEmail.split("@")[0] + "'s Profile";
  }
}

function createFriendsList(loginEmail) {
  fetch(`/getUser?selectedEmail=${loginEmail}`)
    .then((response) => response.json())
    .then((data) => {
      // If endpoint response is incorrect
      if (data.error) {
        console.log(data.error);
      } else {
        const friendsList = document.getElementById("friends-list");

        data.friends.map((friend) =>
          friendsList.appendChild(createUserLi(friend))
        );
        if (data.friends.includes(userEmail.split("@")[0])) {
          document.getElementById("add-friend-btn").innerHTML = "Remove Friend";
        } else {
          document.getElementById("add-friend-btn").innerHTML = "Add Friend";
        }
      }
    })
    .catch((error) => {
      console.error("Failed to add friends", error);
    });
}

function createUserLi(userName) {
  var listItem = document.createElement("li"); // Create a new list item

  listItem.addEventListener("click", () => visitOtherUser(userName));
  var anchor = document.createElement("a"); // Create an anchor element
  anchor.textContent = userName;
  anchor.href = "#"; // Set the href attribute as needed

  listItem.appendChild(anchor); // Append the anchor to the list item
  return listItem;
}

function navigateHome() {
  const loginEmail = localStorage.getItem("loginEmail");
  if (loginEmail) {
    visitOtherUser(loginEmail);
  }
}
