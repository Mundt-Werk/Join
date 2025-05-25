/**
 * Adds or removes a contact to/from the assignment container.
 * If the contact already exists as a circle in the container, it will be removed.
 * Otherwise, a new contact circle with initials and a color will be added.
 * @param {string} contactName - The name of the contact to be added or removed.
 * @returns {void}
 */
function toggleContactInCircle(contactName) {
  const container = document.getElementById("assigned_contacts_container");
  const existingContact = document.getElementById(`circle_${contactName}`);

  if (existingContact) {
    // Removes the contact circle if it already exists
    container.removeChild(existingContact);
  } else {
    // Creates a new contact circle
    const contactCircle = document.createElement("div");
    contactCircle.classList.add("contact-circle");
    contactCircle.id = `circle_${contactName}`;
    contactCircle.textContent = getInitials(contactName);

    let index = contacts.findIndex(contact => contact.name === contactName);
    contactCircle.style.backgroundColor = getColorByIndex(index);

    container.appendChild(contactCircle);
  }
}

document
  .getElementById("contact_dropdown_toggle_button")
  .addEventListener("click", () => {
    loadContactsInList();
  });

/**
 * Displays the controls for adding a subtask.
 * Hides the "+" icon.
 */
function showSubtaskControls() {
  document
    .getElementById("subtask_action_wrapper_desktop")
    .classList.remove("d-none"); 
  document.getElementById("subtask_add_icon_desktop").classList.add("d-none"); 
}

/**
 * Resets the subtask input field and hides the controls.
 * Displays the "+" icon again.
 */
function clearSubtask() {
  document.getElementById("subtask_input_desktop").value = ""; 
  document
    .getElementById("subtask_action_wrapper_desktop")
    .classList.add("d-none"); 
  document
    .getElementById("subtask_add_icon_desktop")
    .classList.remove("d-none"); 
  document.getElementById("errorMessageSubtaskInput").classList.add("d-none");
}

/**
 * Adds a new subtask to the list.
 * Creates a list item with subtask text, an edit input, and buttons for editing and deleting.
 */
function addSubtask() {
  const subtaskText = document.getElementById("subtask_input_desktop").value;
  inputSubtask = subtaskText;

  if (subtaskText === "") return;

  const subtaskList = document.getElementById("subtask_list_desktop");

  const listItem = document.createElement("li");
  listItem.className = "subtask-list-item";

  const subtaskContent = document.createElement("span");
  subtaskContent.textContent = subtaskText;

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "subtask-edit-input d-none";
  editInput.value = subtaskText;

  const subtaskButtons = document.createElement("div");
  subtaskButtons.className = "subtask-buttons";

  const editBtn = document.createElement("button");
  editBtn.className = "subtask-edit-btn";
  editBtn.innerHTML =
    '<img id="editTrash"  src="/projects/join/assets/img/add-task/edit_dark.svg" alt="Edit">';
  editBtn.onclick = function () {
    toggleEditState(listItem, subtaskContent, editInput, editBtn, deleteBtn);
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "subtask-delete-btn";
  deleteBtn.innerHTML =
    '<img   id="trashSubmit" src="/projects/join/assets/img/add-task/delete.svg" alt="Delete">';
  deleteBtn.onclick = function () {
    listItem.remove();
    inputSubtask = "";
  };

  subtaskButtons.appendChild(editBtn);
  subtaskButtons.appendChild(deleteBtn);

  listItem.appendChild(subtaskContent);
  listItem.appendChild(editInput);
  listItem.appendChild(subtaskButtons);
  subtaskList.appendChild(listItem);

  clearSubtask();
}

/**
 * Toggles between edit and view mode for a subtask.
 * In edit mode, the input field is displayed, while the text is hidden.
 * In view mode, the text is updated and the input field is hidden.
 * @param {HTMLElement} subtaskContent - The element displaying the subtask text.
 * @param {HTMLInputElement} editInput - The input field for editing the subtask.
 */
function toggleEditMode(subtaskContent, editInput) {
  const isEditing = !editInput.classList.contains("d-none");

  if (isEditing) {
    subtaskContent.textContent = editInput.value;
    editInput.classList.add("d-none");
    subtaskContent.classList.remove("d-none");
  } else {
    editInput.classList.remove("d-none");
    subtaskContent.classList.add("d-none");
  }
  editInput.addEventListener("input", function () {
    validateInputLength(editInput);
  });
}

/**
 * Validates the input length and disables the edit button if the input is too short.
 * @param {HTMLInputElement} editInput - The input field to validate.
 */
function validateInputLength(editInput) {
  let editBtn = editInput
    .closest(".subtask-list-item")
    .querySelector(".subtask-edit-btn");
  if (editInput.value.length < 3) {
    editBtn.disabled = true; 
  } else {
    editBtn.disabled = false; 
  }
}

/**
 * Validates a field or text selection, displays error messages, and adjusts the border color.
 * @param {HTMLElement} field - The input field or text element to validate.
 * @param {HTMLElement} msg - The element displaying the error message.
 * @param {HTMLElement} [border=field] - Optional. The element whose border color is adjusted (default is the `field`).
 * @returns {boolean} - Returns `true` if the field is invalid, otherwise `false`.
 */
function validateField(field, msg, border = field) {
  const fieldValue = field.value !== undefined ? field.value.trim() : field.textContent.trim();
  const isFieldFilled = fieldValue && fieldValue !== "Select category"; 

  if (field.id === "selected_category_desktop" && border === field) {
    border = document.getElementById("category_dropdown_trigger_desktop");
  }

  if (isFieldFilled) {
    border.style.border = ""; 
    msg.classList.add("d-none"); 
  } else {
    border.style.border = "1px solid red"; 
    msg.classList.remove("d-none"); 
  }

  return !isFieldFilled; 
}

/**
 * Validates all required fields in the form and displays error messages if any field is empty.
 * @returns {boolean} - Returns `true` if at least one field is invalid, otherwise `false`.
 */
function validateRequiredFields() {
  let err = false;

  let titleField = document.getElementById("task_title_input");
  let titleMsg = document.getElementById("task_title_error");
  err = validateField(titleField, titleMsg) || err;

  let dueDateField = document.getElementById("task_due_date_desktop");
  let dueDateMsg = document.getElementById("due_date_error");
  err = validateField(dueDateField, dueDateMsg) || err;

  let categoryField = document.getElementById("selected_category_desktop");
  let categoryMsg = document.getElementById("category_error");
  err = validateField(categoryField, categoryMsg) || err;

  return err; 
}

/**
 * Displays a success message for a defined period and then hides it.
 * @param {number} [sleep=3000] - The time in milliseconds for the message to be displayed.
 * @returns {Promise<void>} - A promise that resolves after the message is hidden.
 */
async function showSuccessMessage(sleep = 3000) {
  const successMessage = document.getElementById("successMessage");

  successMessage.classList.remove("d-none");
  successMessage.classList.add("taskSuccessAnimation");

  await new Promise(resolve => setTimeout(resolve, sleep));
  successMessage.classList.remove("taskSuccessAnimation");

  setTimeout(() => {
    successMessage.classList.add("d-none");
  }, 1000);
}

/**
 * Retrieves the selected contacts from the "assigned_contacts_container".
 * @returns {Array<string>} - An array of selected contact names.
 */
function getSelectedContacts() {
  const container = document.getElementById("assigned_contacts_container");
  const selectedContacts = Array.from(container.children).map(contactCircle => {
    const contact = contacts.find(c => getInitials(c.name) === contactCircle.textContent);
    return contact ? contact.name : contactCircle.textContent;
  });
  return selectedContacts;
}

/**
 * Handles the click event on an <li> element.
 * Updates the `selected` class, checkbox state, and selection in the `assigned_contacts_container`.
 * @param {HTMLElement} element - The clicked <li> element.
 */
function selectedContact(element) {
  const checkbox = element.querySelector("input[type='checkbox']");
  const contactName = checkbox.value; 

  if (element.classList.contains("selected")) {
    element.classList.remove("selected");
    checkbox.checked = false; 
    toggleContactInCircle(contactName); 
  } else {
    element.classList.add("selected");
    checkbox.checked = true; 
    toggleContactInCircle(contactName); 
  }
}

/**
 * Toggles the contact dropdown menu and manages the event listener
 * for closing it on outside click.
 */
function toggleContactDropdown() {
  const dropdown = document.getElementById("contact_dropdown");
  dropdown.classList.toggle("show");

  if (dropdown.classList.contains("show")) {
    document.addEventListener("click", closeDropdownOnOutsideClick);
  } else {
    document.removeEventListener("click", closeDropdownOnOutsideClick);
  }
}

/**
 * Closes the dropdown menu if a click occurs outside of the dropdown or toggle button.
 * @param {MouseEvent} event - The click event.
 */
function closeDropdownOnOutsideClick(event) {
  const dropdown = document.getElementById("contact_dropdown");
  const toggleButton = document.getElementById("contact_dropdown_toggle_button");

  if (dropdown.contains(event.target) || toggleButton.contains(event.target)) {
    return;
  }

  dropdown.classList.remove("show");
  document.removeEventListener("click", closeDropdownOnOutsideClick);
}

/**
 * Sets the current date as the minimum date for the specified date field.
 * @param {string} containerID - The ID of the input field.
 */
function setMinimumDate(containerID) {
  const today = new Date().toISOString().split('T')[0]; 
  const dateInput = document.getElementById(containerID);
  dateInput.min = today; 
}

setMinimumDate('task_due_date_desktop');