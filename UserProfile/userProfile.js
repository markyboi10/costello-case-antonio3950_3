const loginEmail = localStorage.getItem("loginEmail");
const data = localStorage.getItem("userData");

if (loginEmail && data) {
  createFriendsList(loginEmail);

  const userEmail = JSON.parse(data).name;

  if (loginEmail === userEmail) {
    // User is on their own page
    document.getElementById("add-friend-btn").style.display = "none";
    document.getElementById("add-video-form").style.display = "visible";
  } else {
    document.getElementById("add-friend-btn").style.display = "visible";
    document.getElementById("add-video-form").style.display = "none";
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
