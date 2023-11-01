// Handle Google's open auth jwt token -> Navigate to new page
function decodeJwtResponse(data) {
    var jwtData = parseJwt(data);
    console.log(jwtData);
    // Check if the JWT data is valid
    if (jwtData && jwtData.email_verified === true) {
        localStorage.setItem('jwtData', JSON.stringify(jwtData));
        // Redirect to a different user profile home page
        window.location.href = "/UserProfile/index.html";
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
