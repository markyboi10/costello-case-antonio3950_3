// Toogle login - sign up forms
document.addEventListener("DOMContentLoaded", function () {
    const createAccountBtn = document.getElementById("createAccountBtn");
    const backBtn = document.getElementById("backBtn");
    const loginForm = document.querySelector(".rounded.p-5.bg-light");
    const signupForm = document.getElementById("signupForm");

    createAccountBtn.addEventListener("click", function () {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    });
    backBtn.addEventListener("click", function () {
        signupForm.style.display = "none";
        loginForm.style.display = "block";
    });
});

// Regex for email
function validateEmail(email) {
    var regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
}

function checkEmail(inputId) {

    const emailInput = document.getElementById(inputId);
    var email = emailInput.value;
    document.getElementById(inputId).style.border = "";

    // Check email validity
    if (email && !validateEmail(email)) { // not valid
        document.getElementById(inputId).style.border = "2px solid red";
        return false;
    } else { // valid
        return true;
    }
}

// Check if sign up passwords are the same
// function checkPassword() {
//     const passOne = document.getElementById("passwordOne").value;
//     const passTwo = document.getElementById("passwordTwo").value;

//     if (passOne === passTwo) {
//         return true;
//     } else if (!passOne && !passTwo) {
//         return false;
//     } else {
//         document.getElementById("passwordOne").style.border = "2px solid red";
//         document.getElementById("passwordTwo").style.border = "2px solid red";
//         return false;
//     }
// }

// Clear sign up fields and border on back btn click
function clearSingUpFields() {
    document.getElementById("signupEmail").value = "";
    // document.getElementById("passwordOne").value = "";
    // document.getElementById("passwordTwo").value = "";
    // document.getElementById("passwordOne").style.border = "";
    // document.getElementById("passwordTwo").style.border = "";
    document.getElementById("signupEmail").style.border = "";
}

// Clear log in fields and border on sign up btn click
function clearLoginFields() {
    document.getElementById("emailAddress").style.border = "";
    // document.getElementById("LoginPassword").style.border = "";
    document.getElementById("emailAddress").value = "";
    // document.getElementById("LoginPassword").value = "";
}