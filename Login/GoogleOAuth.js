function decodeJwtResponse(data) {
    var jwtData = parseJwt(data);
    // Check if the JWT data is valid (customize this validation according to your requirements)
    if (jwtData && jwtData.email_verified === true) {
        console.log(jwtData);
        // Redirect to a different HTML file if the JWT is valid
        window.location.href = "../UserProfile/index.html"; // Replace with the desired URL
    } else {
        // Handle invalid JWT or show an error message
        alert('Invalid JWT');
    }
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
