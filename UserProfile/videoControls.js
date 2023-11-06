var storedUserData = localStorage.getItem('userData');

if (storedUserData) {
    // Parse the JSON data
    var userData = JSON.parse(storedUserData);
    var currVideo;

    function makePrimaryVideo(video) {
        var videoContainer = document.getElementById('video-container');
        var commentsContainer = document.getElementById('comments-container');

        if (currVideo != null) {
            toggleDisplay(currVideo);
            // If a video is selected, clear it
            videoContainer.innerHTML = "";
            commentsContainer.innerHTML = "";
        }

        var primVid = document.createElement('iframe')
        var primDesc = document.createElement('p');

        primVid.src = video.src;
        primVid.allowFullscreen = true;
        primDesc.textContent = video.description;

        videoContainer.appendChild(primVid);
        videoContainer.appendChild(primDesc);

        // Add the comments to the primary video
        video.comments.map(comment=> createComment(comment));

        currVideo = video;
    }

    // Adds video to the "other-vids-container". AKA, the right hand side
    function addToOtherVids(video) {
        // Regex for finding the video id of each video
        const regex = /embed\/([^?]+)/;

        var otherVidsContainer = document.getElementsByClassName("other-vids-container")[0];
        var videoDiv = document.createElement('div');

        var vidDesc = document.createElement('p');
        var vidDescAnchor = document.createElement('a');
        vidDesc.appendChild(document.createTextNode(video.description));
        vidDescAnchor.appendChild(vidDesc);
        vidDescAnchor.addEventListener("click", () => changeToVideo(video));

        var thumbnail = document.createElement('img');
        var videoId = regex.exec(video.src)[1];

        thumbnail.src = "https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg";
        thumbnail.alt = video.description;
        thumbnail.addEventListener("click", () => changeToVideo(video));

        videoDiv.appendChild(thumbnail);
        videoDiv.appendChild(vidDescAnchor);

        videoDiv.containedVideo = video;

        otherVidsContainer.appendChild(videoDiv);

        return videoDiv;
    }

    function toggleDisplay(video) {
        var otherVidsContainer = document.getElementsByClassName("other-vids-container")[0];

        // Toggle the display of the video
        for (let i in otherVidsContainer.childNodes) {
            let child = otherVidsContainer.childNodes[i]; // Get the div
            if (child.containedVideo == video)
                if (child.style.display == "none")
                    child.style.display = "block";
                else
                    child.style.display = "none";
        }
    }

    function changeToVideo(video) {
        // Remove the video from visibility on the right-hand side
        toggleDisplay(video);

        // Set the primary video
        makePrimaryVideo(video);
    }

    function createComment(commentData) {
        var commentsContainer = document.getElementById('comments-container');

        var comment = document.createElement('div');
        var commentUser = document.createElement('h3');
        var commentContent = document.createElement('p');

        commentUser.appendChild(document.createTextNode(commentData.user));
        commentContent.appendChild(document.createTextNode(commentData.content));

        comment.appendChild(commentUser);
        comment.appendChild(commentContent);

        commentsContainer.appendChild(comment);
    }

    // Access and display the data
    document.getElementById('username').textContent = userData.name;

    function addVideo() {
        const videoUrl = document.getElementById("video-url").value;
        const videoDescription = document.getElementById("video-description").value;  
        const userName = userData.name;
    
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
                comments:[]
            };
            addToOtherVids(videoData);    
        });
    }

    function addComment(){
        // Get the video url from the iframe
        const videoUrl = document
        .getElementById("video-container")
        .getElementsByTagName("iframe")[0]
        .getAttribute("src");

        const comment = document.getElementById("user-comment").value;
        const userName = userData.name; //TODO: replace with the name of the user being commented on
        const commentUser = userData.name;
    
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
            commentUser
          }),
        }).then(() => {
            const commentData = {
                user: commentUser.split('@')[0],
                content: comment
            };
           createComment(commentData);  
        });
    }

    if (userData.videos.length != 0) {
        makePrimaryVideo(userData.videos[0]);

        if (userData.videos.length > 1)
            // Fill all the other videos to the selection panel
            for (let i = 0; i < userData.videos.length; i++) {
                var video = userData.videos[i];
                var vidDiv = addToOtherVids(video);
                if (i === 0)
                    vidDiv.style.display = "none";
            }
    }
    else {
        console.log("No videos to show");
    }

    // Access and display the data
    document.getElementById('username').textContent = userData.name;

}
