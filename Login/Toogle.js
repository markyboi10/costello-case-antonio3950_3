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