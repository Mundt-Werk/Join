/**
 * Initializes the sign-up process by loading user data.
 */
async function initSignUp() {
  await loadUserData();
}

/**
 * Loads user data from the API.
 */
async function loadUserData() {
  await loadUserAPI();
}

/**
 * Fetches user data from the Firebase API and processes it into a usable format.
 */
async function loadUserAPI() {
  let response = await fetch(BASE_URL + "users.json");
  let usersFromFirebase = await response.json();
  users = [];
  for (const user of usersFromFirebase) {
    users.push({
      name: user.name,
      email: user.email.toLowerCase(), 
      password: user.password,
    });
  }
}

/**
 * Toggles the visibility of the password input field and updates the lock icon.
 */
function showPassword() {
  let input = document.getElementById("password");
  let lockImg = document.getElementById("lock-img-1");
  if (input.type === "password") {
    input.type = "text";
    lockImg.src = "../assets/img/icons/visibility.png";
  } else {
    input.type = "password";
    lockImg.src = "../assets/img/icons/visibility_off.png";
  }
}

/**
 * Toggles the visibility of the confirm-password input field and updates the lock icon.
 */
function showPassword2() {
  let input = document.getElementById("confirm-password");
  let lockImg = document.getElementById("lock-img-2");
  if (input.type === "password") {
    input.type = "text";
    lockImg.src = "../assets/img/icons/visibility.png";
  } else {
    input.type = "password";
    lockImg.src = "../assets/img/icons/visibility_off.png";
  }
}

/**
 * Validates the name input field to ensure it has at least 2 characters.
 */
function validateName() {
  let nameInput = document.getElementById("name");
  let isValid = nameInput.value.trim().length >= 2;
  document.getElementById("wrongNameMessage").style.display = isValid
    ? "none"
    : "block";
  validateForm(); 
}

/**
 * Validates the email input field to ensure it matches a proper email format.
 */
function validateEmailField() {
  let emailInput = document.getElementById("email");
  let isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
  document.getElementById("wrongMailMessage").style.display = isValid
    ? "none"
    : "block";
  validateForm(); 
}

/**
 * Validates the password input field to ensure it has at least 6 characters and checks if passwords match.
 */
function validatePasswordField() {
  let passwordInput = document.getElementById("password");
  let isValid = passwordInput.value.trim().length >= 6;
  document.getElementById("wrongPasswortMessage").style.display = isValid
    ? "none"
    : "block";
  checkPasswordMatch(); 
  validateForm(); 
}

/**
 * Validates the confirm-password field by checking if it matches the password field.
 */
function validateConfirmPasswordField() {
  checkPasswordMatch();
  validateForm(); 
}

/**
 * Checks if the password and confirm-password fields match and displays an appropriate message.
 */
function checkPasswordMatch() {
  let password = document.getElementById("password").value.trim();
  let confirmPassword = document
    .getElementById("confirm-password")
    .value.trim();
  let isMatch = password === confirmPassword;
  document.getElementById("password-dont-match").style.display = isMatch
    ? "none"
    : "block";
}

/**
 * Validates the entire sign-up form and enables or disables the sign-up button based on form validity.
 */
function validateForm() {
  let nameInput = document.getElementById("name");
  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("password");
  let confirmPasswordInput = document.getElementById("confirm-password");
  let privacyCheckbox = document.getElementById("remember");
  let signupButton = document.getElementById("signupButton");

  let isNameValid = nameInput.value.trim().length >= 2;
  let isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
  let isPasswordValid = passwordInput.value.trim().length >= 6;
  let isPasswordMatch = passwordInput.value === confirmPasswordInput.value;
  let isPrivacyChecked = privacyCheckbox.checked;

  let isFormValid =
    isNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isPasswordMatch &&
    isPrivacyChecked;
  signupButton.disabled = !isFormValid;
  signupButton.classList.toggle("disabled", !isFormValid);
}

/**
 * Redirects the user to the login page.
 */
function redirectToLogIn() {
  window.location.href = "../index.html";
}

/**
 * Autofills the form fields with pre-defined values for testing purposes.
 */
function autofillFields() {
  let nameInput = document.getElementById("name");
  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("password");
  let confirmPasswordInput = document.getElementById("confirm-password");
  let privacyCheckbox = document.getElementById("remember");

  nameInput.value = "TeamJoin375";
  emailInput.value = "Join375@gmail.com";
  passwordInput.value = "TeamJoin375";
  confirmPasswordInput.value = "TeamJoin375";
  privacyCheckbox.checked = true;

  validateForm();
}

/**
 * Validates passwords and registers the user if the form is valid.
 * @param {Event} event - The event object to prevent default behavior.
 */
async function validatePasswords(event) {
  event.preventDefault();
  if (!document.getElementById("signupButton").disabled) {
    await registerUser();
  }
}
