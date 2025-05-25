let isValid = true;

async function registerUser() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let confirmPassword = document.getElementById("confirm-password").value.trim();
  let errorDiv = document.getElementById("password-dont-match");

  checkPassword(password, confirmPassword, errorDiv);
  if (!isValid) return;
  let isUserAdded = await pushNewUserToArray(name, email, password);
  if (!isUserAdded) return;

  showConfirmationModal();
  setTimeout(() => {
      window.location.href = "../index.html";
  }, 2000);
}

function showConfirmationModal() {
  let modal = document.getElementById("confirmation-modal");
  modal.classList.remove("hidden"); 
}

function checkPassword(password, confirmPassword, errorDiv){
  if (password !== confirmPassword) {
    errorDiv.style.display = "block";
    isValid = false;
  } else {
    errorDiv.style.display = "none";
  }
}

async function pushNewUserToArray(name, email, password) {
  email = email.toLowerCase(); 

  if (emailExists(email)) {
    showEmailExistsModal();
    return false;
  }
  let newUser = {
    name: name,
    email: email,
    password: password,
  };
  users.push(newUser);
  await uploadNewUsers(users);
  return true;
}

function showEmailExistsModal() {
  let modal = document.getElementById("confirmation-modal2");
  modal.classList.remove("hidden"); 
}

function closeConfirmationModal2() {
  let modal = document.getElementById("confirmation-modal2");
  modal.classList.add("hidden"); 

  document.getElementById("email").value = "";

  let signupButton = document.getElementById("signupButton");
  signupButton.disabled = true;
  signupButton.classList.add("disabled"); 
}

function emailExists(email) {
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
}

async function uploadNewUsers(data = {}) {
  let response = await fetch(BASE_URL + "users" + ".json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  await response.json();
}