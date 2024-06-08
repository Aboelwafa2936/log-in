"use strict";

let signUpLink = document.getElementById("signUpLink");
let logInLink = document.getElementById('logInLink');
let formFloating = document.querySelectorAll('.form-floating');
let signUp = document.querySelector('.sign-up');
let logIn = document.querySelector('.log-in');
let storedData = sessionStorage.getItem('stateChanges');
let signUserName = document.getElementById('signUserName');
let signUserPass = document.getElementById('signUserPass');
let userEmail = document.getElementById('userEmail');
let logBtn = document.getElementById('logBtn');
let signBtn = document.getElementById('signBtn');
let userName = document.getElementById('userName');
let userPass = document.getElementById('userPass');
let logInputs = document.querySelectorAll('#loginForm input');
let signInputs = document.querySelectorAll('#signupForm input');
let loginAlert = document.getElementById('loginAlert');
let signAlert = document.getElementById('signAlert');
let users = [];
if (JSON.parse(localStorage.getItem("users")) != null) {
    users = JSON.parse(localStorage.getItem("users"));
}
// Function to check the input values in the login form
function checkInputs() {
    if (loginAlert !== null) {
        loginAlert.innerHTML = '';
        if (userName.value == '' || userPass.value == '') {
            var ele = document.createElement("span");
            ele.textContent = "All inputs are required";
            loginAlert.appendChild(ele);
        }
    }
}
// Function to check the input values in the sign-up form
function checkSignInputs() {
    if (signAlert !== null) {
        signAlert.innerHTML = '';
        if (signUserName.value == '' || signUserPass.value == '' || userEmail.value == '') {
            var ele = document.createElement("span");
            ele.textContent = "All inputs are required";
            signAlert.appendChild(ele);
        }
    }
}
// Removing validation from the inputs
function removeValidation(element) {
    element.classList.remove('is-invalid');
    element.classList.remove('is-valid');
}
// Add regex to the inputs of the login form
function validateLogInputsValues(element) {
    let regex = {
        userName: /^[a-z0-9_-]{3,15}$/,
        userPass: /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
    };
    if (regex[element.id].test(element.value)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
    } else {
        element.classList.remove('is-valid');
        element.classList.add('is-invalid');
    }
}
// Add regex to the inputs of the sign-up form
function validateSignInputsValues(element) {
    let regex = {
        signUserName: /^[a-z0-9_-]{3,15}$/,
        userEmail: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        signUserPass: /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
    };
    if (regex[element.id].test(element.value)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        return true;
    } else {
        element.classList.remove('is-valid');
        element.classList.add('is-invalid');
        return false;
    }
}
// Function to display the sign-up form
function applySignChanges() {
    formFloating.forEach(element => {
        element.style.color = 'white';
    });
    signUp.classList.remove('d-none');
    logIn.classList.add('d-none');
}
// Function to display the login form
function applyLogChanges() {
    formFloating.forEach(element => {
        element.style.color = '#b94da1';
    });
    signUp.classList.add('d-none');
    logIn.classList.remove('d-none');
}
// Clear inputs
function clearInputs() {
    signInputs.forEach(input => {
        input.value = '';
    });
    logInputs.forEach(input => {
        input.value = '';
    });
}
// Function to display the sign-up form on link click
try{
    signUpLink.addEventListener('click', function (e) {
        e.preventDefault();
        applySignChanges();
        sessionStorage.setItem('stateChanges', 'true');
        clearInputs();
    });
}catch(error){
    (error);
}
// Add logic for the eye icon
let loginEyeIcon = document.getElementById('loginEyeIcon');
let signEyeIcon = document.getElementById('signEyeIcon');

function loginEyeLogic() {
        if (userPass.value !== "") {
            loginEyeIcon.classList.remove('d-none');
        } else {
            loginEyeIcon.classList.add('d-none');
            loginEyeIcon.classList.add('fa-eye');
            userPass.type = "password";
        }
};
if(loginEyeIcon !== null){
    loginEyeIcon.addEventListener('click', () => {
        if (userPass.type === "password") {
            userPass.type = "text";
            loginEyeIcon.classList.add('fa-eye-slash');
            loginEyeIcon.classList.remove('fa-eye');
        } else {
            userPass.type = "password";
            loginEyeIcon.classList.remove('fa-eye-slash');
            loginEyeIcon.classList.add('fa-eye');
        }
    });
}
function signEyeLogic() {
    if (signUserPass.value !== "") {
        signEyeIcon.classList.remove('d-none');
    } else {
        signEyeIcon.classList.add('d-none');
        signUserPass.type = "password";
        signEyeIcon.classList.remove('fa-eye-slash');
        signEyeIcon.classList.add('fa-eye');
    }
};
if(signEyeIcon !== null){
    signEyeIcon.addEventListener('click', () => {
        if (signUserPass.type === "password") {
            signUserPass.type = "text";
            signEyeIcon.classList.add('fa-eye-slash');
            signEyeIcon.classList.remove('fa-eye');
        } else {
            signUserPass.type = "password";
            signEyeIcon.classList.remove('fa-eye-slash');
            signEyeIcon.classList.add('fa-eye');
        }
    });
}
// Loop over login inputs
if (logInputs !== null) {
    for (let i = 0; i < logInputs.length; i++) {
        logInputs[i].addEventListener('input', () => {
            if (logInputs[i].value == "") {
                removeValidation(logInputs[i]);
            } else {
                validateLogInputsValues(logInputs[i]);
                loginEyeLogic();
            }
        });
    }
}
// Loop over sign-up inputs
if (signInputs !== null) {
    for (let i = 0; i < signInputs.length; i++) {
        signInputs[i].addEventListener('input', () => {
            if (signInputs[i].value == "") {
                removeValidation(signInputs[i]);
            } else {
                validateSignInputsValues(signInputs[i]);
                signEyeLogic();
            }
        });
    }
}
// Prevent the default behavior of the form element
let forms = document.querySelectorAll('#loginForm, #signupForm');
if (forms !== null) {
    forms.forEach(form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
        });
    });
}
// Events for the login button
if (logBtn !== null) {
    logBtn.addEventListener('click', () => {
        checkInputs();
        getLoginData();
    });
    logBtn.addEventListener('mouseover', () => {
        logBtn.classList.add('special');
    });
    logBtn.addEventListener('mouseleave', () => {
        logBtn.classList.remove('special');
    });
}
// Getting user data from sign-up form 
function getSignUpData() {
    const signData = {
        name: signUserName.value.trim(),
        pass: signUserPass.value.trim(),
        email: userEmail.value.trim()
    };
    // Validate that all fields are filled out
    if (!signData.name || !signData.pass || !signData.email) {
        Swal.fire({
            icon: 'error',
            title: 'Incomplete Form',
            text: 'Please fill out all fields.'
        });
        return;
    }
    // Assuming `users` is retrieved from localStorage or initialized somewhere
    let users = JSON.parse(localStorage.getItem('users')) || [];
    // Check for duplication
    let userExist = users.some(user => user.email === signData.email || user.name === signData.name || user.pass === signData.pass);
    if (userExist) {
        Swal.fire({
            icon: 'error',
            title: 'User Exists',
            text: 'User with this email, name, or password already exists.'
        });
    } else {
        users.push(signData);
        localStorage.setItem('users', JSON.stringify(users));
        Swal.fire({
            icon: 'success',
            title: 'Signed Up',
            text: 'User registered successfully!'
        });
        applyLogChanges();
        for(let input of logInputs){
            removeValidation(input);
        }
    }
}
// Add event listener to the sign-up button
signBtn = document.getElementById('signBtn');
if (signBtn !== null) {
    signBtn.addEventListener('click', (event) => {
        getSignUpData();
        event.preventDefault();
    });
}
// Getting user data from login form
function getLoginData() {
    const userName = document.getElementById('userName');
    const userPass = document.getElementById('userPass');

    const logData = {
        name: userName.value.trim(),
        pass: userPass.value.trim()
    };

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    let userFound = false;
    let loggedInUser = ''; // Variable to store the logged-in user's name

    if (logData.name && logData.pass) {
        for (let user of storedUsers) {
            if (user.name === logData.name && user.pass === logData.pass) {
                userFound = true;
                loggedInUser = user.name; // Store the logged-in user's name
                break;
            }
        }
    }

    if (userFound) {
        Swal.fire({
            icon: 'success',
            title: 'Logged In',
            text: 'Login successful!'
        }).then(() => {
            // Set the href attribute of the homeLink and click it
            const homeLink = document.getElementById('homeLink');
            homeLink.setAttribute('href', 'html/Home.html');
            homeLink.click();
            
            // Update the greeting message on the home page with the user's name
            localStorage.setItem("user", loggedInUser); // Store the user's name in localStorage
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid name or password.'
        });
    }
}
// On the home page
document.addEventListener("DOMContentLoaded", function () {
    const user = localStorage.getItem("user");
    if (user) { // Check if user's name is available in localStorage
        const greetingText = document.getElementById("greetingText");
        greetingText.textContent = `Welcome back, ${user}!`; // Use the user's name retrieved from localStorage
    }
});
// Function to log out a user
function logout() {
    localStorage.removeItem('user');
}
