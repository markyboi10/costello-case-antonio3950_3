var storedUserData;
var userData;
var currVideo;

/*
 *   VIDEO CONTROLS FUNCTIONS
 */
function makePrimaryVideo(video) {
  var videoContainer = document.getElementById("primary-video");
  var videoDescContainer = document.getElementById("vid-desc");
  var commentsContainer = document.getElementById("comments-container");
  document.getElementById("add-comment-form"); // Shows the comment form when a primary video is set

  videoContainer.innerHTML = "";
  commentsContainer.innerHTML = "";

  if (currVideo != null) {
    toggleDisplay(currVideo);
  }

  var primVid = document.createElement("iframe");
  primVid.style.borderRadius = "10px";

  primVid.src = video.src;
  primVid.allowFullscreen = true;

  videoContainer.appendChild(primVid);
  videoDescContainer.innerText = video.description;

  // Add the comments to the primary video
  document.getElementById("add-comment-form").style.display = "block"; // Ensure comments can be added.
  video.comments.map((comment) => createComment(comment));

  currVideo = video;
}

// Adds video to the "other-vids-container". AKA, the right hand side
function addToOtherVids(video) {
  // Regex for finding the video id of each video
  const regex = /embed\/([^?]+)/;
  var videoId = regex.exec(video.src)[1];

  var otherVidsContainer = document.getElementsByClassName(
    "other-vids-container"
  )[0];
  var videoDiv = document.createElement("div");
  if (videoDiv) videoDiv.classList.add("other-vid");

  var vidDesc = document.createElement("p");
  var vidDescAnchor = document.createElement("a");
  vidDesc.appendChild(document.createTextNode(video.description));
  vidDescAnchor.appendChild(vidDesc);
  vidDescAnchor.addEventListener("click", () => changeToVideo(video));

  var thumbnail = document.createElement("img");

  thumbnail.src =
    "https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg";
  thumbnail.alt = video.description;
  thumbnail.addEventListener("click", () => changeToVideo(video));

  videoDiv.appendChild(thumbnail);
  videoDiv.appendChild(vidDescAnchor);

  videoDiv.containedVideo = video;

  otherVidsContainer.appendChild(videoDiv);

  return videoDiv;
}

// Clears the "other videos" section.
function clearVideos() {
  var otherVidsContainer = document.getElementsByClassName(
    "other-vids-container"
  )[0];

  otherVidsContainer.innerHTML = "";
}

function toggleDisplay(video) {
  var otherVidsContainer = document.getElementsByClassName(
    "other-vids-container"
  )[0];

  // Toggle the display of the video
  for (let i in otherVidsContainer.childNodes) {
    let child = otherVidsContainer.childNodes[i]; // Get the div
    if (child.containedVideo == video)
      if (child.style.display == "none") child.style.display = "block";
      else child.style.display = "none";
  }
}

function changeToVideo(video) {
  // Remove the video from visibility on the right-hand side
  toggleDisplay(video);

  // Set the primary video
  makePrimaryVideo(video);
}

function createComment(commentData) {
  var commentsContainer = document.getElementById("comments-container");

  var comment = document.createElement("div");
  var commentUser = document.createElement("h3");
  var commentContent = document.createElement("p");

  commentUser.appendChild(document.createTextNode(commentData.user));
  commentContent.appendChild(document.createTextNode(commentData.content));

  comment.appendChild(commentUser);
  comment.appendChild(commentContent);

  commentsContainer.prepend(comment);
}

function addVideo() {
  const videoUrl = document.getElementById("video-url").value;
  const videoDescription = document.getElementById("video-description").value;
  const userName = userData.name;
  const regex = /embed\/([^?]+)/;

  const videoId = regex.exec(videoUrl);
  if (!videoId || videoId.length < 1) {
    alert("Invalid Youtube Video Embed URL");
    return null;
  }

  fetch("/add-video", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      videoUrl,
      videoDescription,
      userName,
    }),
  }).then(() => {
    const videoData = {
      src: videoUrl,
      description: videoDescription,
      comments: [],
    };
    if (videoUrl) {
      addToOtherVids(videoData);
    }
  });
  // Clear placeholder of comment after clicking the button to enter video and description
  document.getElementById("video-url").value = "";
  document.getElementById("video-description").value = "";
}

function addComment() {
  // Get the video url from the iframe
  const videoUrl = document
    .getElementById("primary-video")
    .getElementsByTagName("iframe")[0]
    .getAttribute("src");

  const comment = document.getElementById("user-comment").value;
  const userName = userData.name;
  const commentUser = localStorage.getItem("loginEmail");

  fetch("/add-comment", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      videoUrl,
      userName,
      comment,
      commentUser,
    }),
  }).then(() => {
    const commentData = {
      user: commentUser.split("@")[0],
      content: comment,
    };
    createComment(commentData);
  });
  // Clear placeholder of comment after clicking the button to comment
  document.getElementById("user-comment").value = "";
}

/*
 * PRIMARY PAGE INFORMATION FUNCTION
 */
function updatePageInfo() {
  storedUserData = localStorage.getItem("userData");
  if (storedUserData) {
    // Parse the JSON data
    userData = JSON.parse(storedUserData);
    
    // Display the user data.
    document.getElementById("username").textContent = userData.name.split('@')[0];

    // If videos exist.
    if (userData.videos.length != 0) {

      var currVideoFound = false; // Track if we found currVideo in the selection panel.

      if(currVideo == null) // If the currently selected video is null, set the first video.
        makePrimaryVideo(userData.videos[0]);

      // Clear the videos in the selection panel.
      clearVideos();
      // Fill all the other videos to the selection panel
      for (let i = 0; i < userData.videos.length; i++) {
        var video = userData.videos[i];
        if (video.src) {
          var vidDiv = addToOtherVids(video);
          if (video.src == currVideo.src) {
            currVideo = video;
            currVideoFound = true;
            vidDiv.style.display = "none";
          }
        }
      }

      
      if(!currVideoFound) { // If the video was removed.
        console.log("Currently selected video has been removed.");

        // Clear the comments section and title
        document.getElementById("vid-desc").innerHTML = "";
        document.getElementById("comments-container").innerHTML = "";

        // Write a message saying the video was removed.
        document.getElementById("primary-video").innerHTML =
          "The selected video has been removed.";
        document.getElementById("add-comment-form").style.display = "none"; //Hides add comment if user has no videos added yet
      } else { // Insert the current version of comments (easier than checking if it's changed)
        document.getElementById("comments-container").innerHTML = "";
        currVideo.comments.map((comment) => createComment(comment));
      }
      
      // Make sure the video container is visible (there are videos).
      document.getElementById("video-container").style.display = "visible";
      
    } else {
      console.log("No videos to show");
      document.getElementById("video-container").style.display = "none"; //Hides video container if user has no videos added yet
      document.getElementById("primary-video").innerHTML =
        "<h1>No videos yet!</h1>";
    }
  } else {
    console.error("Failed to load user data.");
    document.getElementById("video-container").style.display = "none"; //Hides video container if user has no videos added yet
    document.getElementById("primary-video").innerHTML =
      "<h1>Could not load user data.</h1>";
  }
}

// Call once on page load.
updatePageInfo();

/*
 *  FUNCTION TO UPDATE PAGE INFORMATION
 */
function getNewPageData() {
  if(userData) {
    fetch(`/getUser?selectedEmail=${userData.name}`)
      .then((response) => response.json())
      .then((data) => {
        // If endpoint response is incorrect
        if (data.error) {
          console.log(data.error);
        } else {
          if(localStorage.getItem("userData") != JSON.stringify(data))
          {
            localStorage.setItem("userData", JSON.stringify(data));
            updatePageInfo(); // DEREK TODO: Write this function
          }
        }
      })
      .catch((error) => {
        console.error("Page failed to update. Reason: " + error);
      });
  }
}
