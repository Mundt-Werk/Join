/**
 * References to DOM elements for user inputs and validation messages.
 */
let nameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let phoneInput = document.getElementById('phone');
let createContactBtn = document.querySelector('.create-button');
let wrongNameMessage = document.getElementById('wrongNameMessage');
let wrongMailMessage = document.getElementById('wrongMailMessage');
let wrongNumberMessage = document.getElementById('wrongNumberMessage');

/**
 * Handles the focus event on the name input field to show validation messages.
 */
nameInput.onfocus = () => {
    if (!nameInput.value.trim()) showValidationMessage(wrongNameMessage); 
};
nameInput.oninput = () => validateName();

emailInput.onfocus = () => {
    if (!emailInput.value.trim()) showValidationMessage(wrongMailMessage);
};
emailInput.oninput = () => validateEmailField();

phoneInput.onfocus = () => {
    if (!phoneInput.value.trim()) showValidationMessage(wrongNumberMessage);
};
phoneInput.oninput = () => validatePhoneField();

/**
 * Displays a validation message for a specific input field.
 * @param {HTMLElement} messageElement - The DOM element containing the validation message.
 */
function showValidationMessage(messageElement) {
    messageElement.style.display = 'block'; 
}

/**
 * Validates the name input field and updates the UI based on the validation result.
 */
function validateName() {
    let isValid = nameInput.value.trim().length >= 3; 
    wrongNameMessage.style.display = isValid ? 'none' : 'block'; 
    validateForm(); 
}

/**
 * Validates the email input field and updates the validation message.
 */
function validateEmailField() {
    let isValid = validateEmail(emailInput.value); 
    wrongMailMessage.style.display = isValid ? 'none' : 'block';
    validateForm();
}

/**
 * Validates an email address using a regular expression.
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email address is valid, otherwise false.
 */
function validateEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.(com|de|org|net|edu|gov|io|info)$/i; 
    return emailRegex.test(email);
}

/**
 * Validates the phone input field and updates the validation message.
 */
function validatePhoneField() {
    let isValid = validatePhone(phoneInput.value); 
    wrongNumberMessage.style.display = isValid ? 'none' : 'block';
    validateForm();
}

/**
 * Validates a phone number by ensuring it has at least 8 digits.
 * @param {string} phone - The phone number to validate.
 * @returns {boolean} True if the phone number is valid, otherwise false.
 */
function validatePhone(phone) {
    let numericPhone = phone.replace(/[^0-9]/g, ''); 
    return numericPhone.length >= 8; 
}

/**
 * Checks the validity of all form fields and enables/disables the submit button accordingly.
 */
function validateForm() {
    let isNameValid = nameInput.value.trim().length >= 2;
    let isEmailValid = validateEmail(emailInput.value);
    let isPhoneValid = validatePhone(phoneInput.value);

    let isFormValid = isNameValid && isEmailValid && isPhoneValid;
    createContactBtn.disabled = !isFormValid;
    createContactBtn.classList.toggle('disabled', !isFormValid);
}

/**
 * Toggles the visibility of validation messages for all input fields.
 */
function toggleValidationMessages() {
    wrongNameMessage.style.display = nameInput.value.trim().length >= 2 ? 'none' : 'block';
    wrongMailMessage.style.display = validateEmail(emailInput.value) ? 'none' : 'block';
    wrongNumberMessage.style.display = validatePhone(phoneInput.value) ? 'none' : 'block';
}

/**
 * Validates the save button's state based on input field validations.
 */
function validateSaveButton() {
    let isNameValid = nameInput.value.trim().length >= 2;
    let isEmailValid = validateEmail(emailInput.value);
    let isPhoneValid = validatePhone(phoneInput.value);

    let isFormValid = isNameValid && isEmailValid && isPhoneValid;
    let saveButton = document.querySelector('.save-button');

    saveButton.disabled = !isFormValid;
    saveButton.classList.toggle('disabled', !isFormValid);
}
