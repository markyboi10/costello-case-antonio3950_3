// Handle Google's open auth jwt token -> Navigate to new page on successfull google login
function decodeJwtResponse(data) {
    var jwtData = parseJwt(data);
    // Check if the JWT data is valid
    if (jwtData && jwtData.email_verified === true) {
        // Redirect to a different user profile home page
        fetch(`/initUser?email=${jwtData.email}`)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('userData', JSON.stringify(data));
                // Redirect to a different user profile home page
                window.location.href = "/UserProfile/index.html";
            })
            .catch(error => {
                console.error('User initialization error', error);
                alert('User initialization error');
            });
    } else {
        alert('Invalid JWT');
    }
}

// Decode (parse) the recieved JWT
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Handle login form submission -> Navigate to new page on successfull login
function decodeLoginFormResponse() {

    // Fetch endpoint and send inputted email address (login form)
    fetch(`/initExistingUser?formEmail=${document.getElementById('emailAddress').value}`)
        .then(response => response.json())
        .then(data => {
            // If endpoint found non existing email, style box red
            if (data.error) {
                document.getElementById("emailAddress").style.border = "2px solid red";
            } else {
                /* 
                 * Otherwise, set the data to local storage so it can be accessed 
                 * by UserProfile where it is navigating to
                */
                localStorage.setItem('userData', JSON.stringify(data));
                window.location.href = "/UserProfile/index.html";
            }
        })
        .catch(error => {
            console.error('User failed to be checked', error);
        });

}

// Handle sign up form submission -> Navigate to new page on successfull sign up
function decodeSignUpResponse() {

    // Fetch endpoint and send inputted email address (sign up form)
    fetch(`/initNewUser?formEmail=${document.getElementById('signupEmail').value}`)
        .then(response => response.json())
        .then(data => {
            // If endpoint found existing email, style box red
            if (data.error) {
                document.getElementById("signupEmail").style.border = "2px solid red";
            } else {
                /* 
                 * Otherwise, set the data to local storage so it can be accessed 
                 * by UserProfile where it is navigating to
                */
                localStorage.setItem('userData', JSON.stringify(data));
                window.location.href = "/UserProfile/index.html";
            }
        })
        .catch(error => {
            console.error('User failed to be added', error);
        });

}
