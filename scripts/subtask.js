
document
  .getElementById("subtask_input_desktop")
  .addEventListener("input", function (event) {
    handleInput(event);
  });


document.addEventListener("keydown", function (event) {
  noSubmit(event, "Enter");
});

document
  .getElementById("subtask_cancel_desktop")
  .addEventListener("click", function () {
    resetInputField();
  });

/**
 * Handles changes in the subtask input field.
 * @param {Event} event - The input event triggered in the subtask field.
 */
function handleInput(event) {
  const inputField = event.target;
  const addIcon = document.getElementById("subtask_add_icon_desktop");
  const actionWrapper = document.getElementById("subtask_action_wrapper_desktop");

  if (inputField.value.trim() !== "") {
    actionWrapper.classList.remove("d-none");
    addIcon.style.display = "none"; 
  } else {
    actionWrapper.classList.add("d-none");
    addIcon.style.display = "block"; 
  }
}

/**
 * Prevents the default action when a specific key is pressed and adds a subtask.
 * @param {Event} event - The keydown event.
 * @param {string} key - The specific key that triggers the action (e.g., "Enter").
 */
function noSubmit(event, key) {
  if (event.code === key && event.target.id === "subtask_input_desktop") {
    addSubtasks(); 
    resetInputField(); 
    event.preventDefault();
  }
}

/**
 * Adds a new subtask based on the input value.
 */
function addSubtasks() {
  const inputField = document.getElementById("subtask_input_desktop");
  const subtaskValue = inputField.value.trim();
  if (subtaskValue !== "") {
    
  }
}

/**
 * Resets the subtask input field and hides the associated actions.
 */

function resetInputField() {
  const inputField = document.getElementById("subtask_input_desktop");
  const addIcon = document.getElementById("subtask_add_icon_desktop");
  const actionWrapper = document.getElementById("subtask_action_wrapper_desktop");

  inputField.value = "";
  actionWrapper.classList.add("d-none");
  addIcon.style.display = "block";
}

/**
 * Toggles between edit and display mode for a subtask.
 * @param {HTMLElement} subtaskContent - The element displaying the subtask text.
 * @param {HTMLInputElement} editInput - The input field for editing the subtask.
 */

function toggleEditMode(subtaskContent, editInput) {
  const isEditing = !editInput.classList.contains("d-none");
  if (isEditing) {
    if (editInput.value.length < 3) {
      showWarningMessage(editInput, "Bitte mindestens 3 Zeichen eingeben.");
      return; 
    }
    subtaskContent.textContent = editInput.value;
    editInput.classList.add("d-none");
    subtaskContent.classList.remove("d-none");
    hideWarningMessage(editInput); 
  } else {
    editInput.classList.remove("d-none");
    subtaskContent.classList.add("d-none");
  }

  document.getElementById("editTrash").src = '../assets/img/add-task/delete.svg';
  document.getElementById("trashSubmit").src = '../assets/img/add-task/checkBlack.svg';
  
  editInput.addEventListener("input", function () {
    validateInputLength(editInput);
  });
}

/**
 * Checks the length of the entered text and enables or disables the edit button accordingly.
 * @param {HTMLInputElement} editInput - The input field for editing.
 */

function validateInputLength(editInput) {
  let editBtn = editInput
    .closest(".subtask-list-item")
    .querySelector(".subtask-edit-btn");

  if (editInput.value.length < 3) {
    editBtn.disabled = true; 
    showWarningMessage(editInput, "Bitte mindestens 3 Zeichen eingeben.");
  } else {
    editBtn.disabled = false; 
    hideWarningMessage(editInput); 
  }
}

/**
 * Displays a warning message for invalid inputs.
 * @param {HTMLInputElement} editInput - The input field being validated.
 * @param {string} message - The warning message to display.
 */

function showWarningMessage(editInput, message) {
  let warning = editInput
    .closest(".before-subtask")
    .querySelector("#warning-message");

  if (warning) {
    warning.textContent = message;
    warning.classList.remove("d-none"); 
    warning.style.marginTop = "5px"; 
  }
}

/**
 * Hides the warning message.
 * @param {HTMLInputElement} editInput - The input field for which the warning message is hidden.
 */

function hideWarningMessage(editInput) {
  let warning = editInput
    .closest(".before-subtask")
    .querySelector("#warning-message");

  if (warning) {
    warning.classList.add("d-none"); 
  }
}
let isContainerEmpty = true;
/**
 * Enables or disables the "Add" button based on the state of the container.
 * @param {boolean} isEmpty - Indicates whether the container is empty.
 */

function toggleAddButtonState(isEmpty) {
  const addButton = document.getElementById('subtask_add_icon_desktop');

  if (isEmpty) {
    addButton.classList.add('disabled');
  } else {
    addButton.classList.remove('disabled');
  }
}

/**
 * Validates the input in the subtask field and displays an error message if necessary.
 */

function checkSubtaskInput() {
  let subtaskInput = document.getElementById("subtask_input_desktop").value;
  let checkSubtaskButton = document.getElementById("checkSubtaskButton");
  let subtaskLength = subtaskInput.length;
  if (subtaskLength < 3) {
    document.getElementById("errorMessageSubtaskInput").classList.remove("hiddenErrorSubtask");
    document.getElementById("checkSubtaskButton").classList.add("disable-subtask-button");
    checkSubtaskButton.disabled = true;
  } else {
    document.getElementById("errorMessageSubtaskInput").classList.add("hiddenErrorSubtask");
    document.getElementById("checkSubtaskButton").classList.remove("disable-subtask-button");
    checkSubtaskButton.disabled = false;
  }
}

toggleAddButtonState(isContainerEmpty);

/**
 * Toggles between edit and view mode for a subtask.
 * Adds a divider between Delete and Check buttons in edit mode.
 * Disables hover effects during edit mode.
 * @param {HTMLElement} listItem - The list item containing the subtask.
 * @param {HTMLElement} subtaskContent - The element displaying the subtask text.
 * @param {HTMLInputElement} editInput - The input field for editing the subtask.
 * @param {HTMLElement} editBtn - The edit button.
 * @param {HTMLElement} deleteBtn - The delete button.
 */

function toggleEditState(listItem, subtaskContent, editInput, editBtn, deleteBtn) {
  if (editInput.classList.contains("d-none")) {
    // Switch to edit mode
    editInput.classList.remove("d-none");
    subtaskContent.classList.add("d-none");
    editInput.style.border = "none";
    editInput.style.borderBottom = "1px solid #29abe2";
    listItem.classList.add("editing");

    let divider = listItem.querySelector(".divider");
    if (!divider) {
      divider = document.createElement("div");
      divider.className = "divider";
      deleteBtn.insertAdjacentElement("afterend", divider); 
    }
    divider.style.display = "block";

    
    editBtn.innerHTML =
      '<img id="editTrash" src="../assets/img/add-task/checkBlack.svg" alt="Check">';
    deleteBtn.innerHTML =
      '<img id="trashSubmit" src="../assets/img/add-task/delete.svg" alt="Delete">';
    
    
    const buttonsContainer = listItem.querySelector(".subtask-buttons");
    buttonsContainer.appendChild(editBtn); 
    buttonsContainer.insertBefore(deleteBtn, divider); 
  } else {
  
    subtaskContent.textContent = editInput.value;
    editInput.classList.add("d-none");
    subtaskContent.classList.remove("d-none");
    listItem.classList.remove("editing");

    let divider = listItem.querySelector(".divider");
    if (divider) {
      divider.style.display = "none";
    }

  
    editBtn.innerHTML =
      '<img id="editTrash" src="../assets/img/add-task/edit_dark.svg" alt="Edit">';
    deleteBtn.innerHTML =
      '<img id="trashSubmit" src="../assets/img/add-task/delete.svg" alt="Delete">';

    
    const buttonsContainer = listItem.querySelector(".subtask-buttons");
    buttonsContainer.appendChild(deleteBtn); 
    buttonsContainer.insertBefore(editBtn, deleteBtn); 
  }
}


