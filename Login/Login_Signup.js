// Toogle login - sign up forms
document.addEventListener("DOMContentLoaded", function () {
    // Grab id's of create acc and back buttons
    const createAccountBtn = document.getElementById("createAccountBtn");
    const backBtn = document.getElementById("backBtn");
    // Grab id's of create log in and sign up forms
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    // Switch to SIGN UP if create acc button is clicked
    createAccountBtn.addEventListener("click", function () {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    });
    // Switch to LOGIN if back acc button is clicked
    backBtn.addEventListener("click", function () {
        signupForm.style.display = "none";
        loginForm.style.display = "block";
    });
});

// Regex for email checking
function validateEmail(email) {
    var regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
}

/*
 * Given email from html, check validity and alter boxes
 * and buttons depending on response
*/
function checkEmail(inputId) {
    const emailInput = document.getElementById(inputId);
    var email = emailInput.value;
    document.getElementById(inputId).style.border = "";

    // Check email validity
    if (email !== null && !validateEmail(email)) { // not valid
        document.getElementById(inputId).style.border = "2px solid red"; // red border
        // Disable button (can't click)
        document.getElementById("loginButton").disabled = true;
        document.getElementById("signUpButton").disabled = true;
        return false;
    } else { // valid
        // Reenable button (can click)
        document.getElementById("signUpButton").disabled = false;
        document.getElementById("loginButton").disabled = false;
        return true;
    }
}

// Clear sign up fields and remove color from border on back btn click
function clearSignUpFields() {
    document.getElementById("signupEmail").value = "";
    document.getElementById("signupEmail").style.border = "";
}

// Clear log in fields and remove color from border on sign up btn click
function clearLoginFields() {
    document.getElementById("emailAddress").style.border = "";
    document.getElementById("emailAddress").value = "";
}