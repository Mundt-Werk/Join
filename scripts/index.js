/**
 * Initializes the login animation, transitions the logo to the header,
 * fades out the first screen, and reveals the main content.
 */
function initLogin() {
  setTimeout(() => {
    let logo = document.getElementById("logo");
    logo.classList.add("move-to-header");

    setTimeout(() => {
      let firstScreen = document.getElementById("first-screen");
      firstScreen.classList.add("fade-out");

      setTimeout(() => {
        firstScreen.classList.add("d-none");

        document.getElementById("header-index").classList.add("fade-in");
        document.getElementById("main-container").classList.add("fade-in");
        document.getElementById("signup-container").classList.add("fade-in");
        document.getElementById("links-container").classList.add("fade-in");
      }, 600);
    }, 100);
  }, 0);
}

/**
 * Updates the logo image based on the current screen width.
 */
function changeLogoImage() {
  let logo = document.getElementById('logo');
  logo.src = window.innerWidth >= 500 
    ? '/projects/join/assets/img/LogoBlau.png' 
    : '/projects/join/assets/img/LogoWeiß.png';
}

/**
 * Toggles the visibility of the password input field and updates the lock icon image.
 */
function showPassword3() {
  let input = document.getElementById("password");
  let lockImg = document.getElementById("lock-img");

  if (input && lockImg) {
    if (input.type === "password") {
      input.type = "text";
      lockImg.src = "/projects/join/assets/img/icons/visibility.png";
    } else {
      input.type = "password";
      lockImg.src = "/projects/join/assets/img/icons/visibility_off.png";
    }
  }
}

/**
 * Redirects the user to the signup page.
 */
function redirectToSignUp() {
  window.location.href = "/projects/join/htmls/singUp.html";
}

/**
 * Redirects the user to the summary page for guests.
 */
function redirectToSummaryGuest() {
  window.location.href = "/projects/join/htmls/summary-guest.html"
}

/**
 * Redirects the user to the summary page.
 * @param {Event} event - The event object to prevent default behavior.
 */
function redirectToSummary(event) {
  event.preventDefault();
  window.location.href = "/projects/join/htmls/summary.html";
}

/**
 * Fills the email and password input fields with predefined credentials and updates the lock icon.
 */
function fillEmail() {
  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("password");
  let lockImg = document.getElementById("lock-img");

  if (emailInput && passwordInput && lockImg) {
    emailInput.value = "Join375@gmail.com";
    passwordInput.value = "TeamJoin375";
    lockImg.src = "/projects/join/assets/img/icons/visibility_off.png";
  }
}

/**
 * Saves the user's email and password to localStorage if "Remember Me" is checked.
 */
function saveLoginData() {
  let rememberMe = document.getElementById("remember");
  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("password");

  if (rememberMe.checked) {
    localStorage.setItem("savedEmail", emailInput.value);
    localStorage.setItem("savedPassword", passwordInput.value);
  } else {
    localStorage.removeItem("savedEmail");
    localStorage.removeItem("savedPassword");
  }
}

/**
 * Loads the saved email and password from localStorage and populates the input fields.
 */
function loadLoginData() {
  let savedEmail = localStorage.getItem("savedEmail");  
  let savedPassword = localStorage.getItem("savedPassword");

  if (savedEmail && savedPassword) {
    document.getElementById("email").value = savedEmail;
    document.getElementById("password").value = savedPassword;
    document.getElementById("remember").checked = true;
  }
}

let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');
let loginButton = document.getElementById('loginButton');
let generalErrorMessage = document.getElementById("generalErrorMessage");

/**
 * Validates the format of an email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if the email is valid, otherwise false.
 */
function validateEmail(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
  return emailRegex.test(email);
}

/**
 * Validates the password by ensuring it has at least 6 characters.
 * @param {string} password - The password to validate.
 * @returns {boolean} - True if the password is valid, otherwise false.
 */
function validatePassword(password) {
  return password.trim().length >= 6;
}

/**
 * Validates the user's login credentials against the stored user data.
 * @param {Event} event - The event object to prevent default behavior.
 */
function validateLogin(event) {
  event.preventDefault();
  const email = emailInput.value.trim().toLowerCase(); 
  const password = passwordInput.value.trim();

  const user = users.find(user => user.email.toLowerCase() === email && user.password === password);

  if (user) {
    localStorage.setItem("loggedInEmail", user.email);
    localStorage.setItem("loggedInName", user.name);

    generalErrorMessage.style.display = "none";
    redirectToSummary(event); 
  } else {
    generalErrorMessage.style.display = "block"; 
  }
}

/**
 * Hides the general error message if the email and password are valid.
 */
function hideErrorMessageIfValid() {
  let email = emailInput.value.trim();
  let password = passwordInput.value.trim();

  let isEmailValid = validateEmail(email);
  let isPasswordValid = validatePassword(password);

  if (isEmailValid && isPasswordValid) {
    generalErrorMessage.style.display = "none";
  }
}

emailInput.oninput = hideErrorMessageIfValid;
passwordInput.oninput = hideErrorMessageIfValid;

/**
 * Resets the login form by clearing input fields, hiding error messages, and disabling the login button.
 */
function resetLoginForm() {
  emailInput.value = '';
  passwordInput.value = '';
  generalErrorMessage.style.display = 'none';
  loginButton.disabled = true;
  loginButton.classList.add('disabled');
}