var storedUserData = localStorage.getItem('userData');

if (storedUserData) {
    // Parse the JSON data
    var userData = JSON.parse(storedUserData);
    // Access and display the data
    document.getElementById('username').textContent = userData.name;
    
    if(userData.videos.length != 0)
    {
        // Fill primary video in
        var videoContainer = document.getElementsByClassName('video-container')[0];
        var commentsContainer = document.getElementsByClassName('comments-container')[0];
        var primVid = document.createElement('iframe')
        var primDesc = document.createElement('p');

        primVid.src = userData.videos[0].src;
        primVid.allowFullscreen = true;
        primDesc.textContent = userData.videos[0].description;

        videoContainer.appendChild(primVid);
        videoContainer.appendChild(primDesc);
        
        // Add the comments to the primary video
        for(var i in userData.videos[0].comments)
        {
            var comment = document.createElement('div');
            var commentUser = document.createElement('h3');
            var commentContent = document.createElement('p');

            commentUser.appendChild(document.createTextNode(userData.videos[0].comments[i].user));
            commentContent.appendChild(document.createTextNode(userData.videos[0].comments[i].content));
            
            comment.appendChild(commentUser);
            comment.appendChild(commentContent);

            commentsContainer.appendChild(comment);
        }

        
        if(userData.videos.length > 1)
        {
            // // Fill all the other videos to the selection panel
            // var otherVidsContainer = document.getElementsByClassName("other-vids-container")[0];
            // for(var i = 1; i < userData.videos.length; i++)
            // {
            //     var video = userData.videos[i];
            //     var videoDiv = document.createElement('img');
            //     videoD
            //     otherVidsContainer.
            // }
            console.log("Other videos to add");
        }
    }
    else {
        console.log("No videos to show");
    }
}
