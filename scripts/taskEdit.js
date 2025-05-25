/**
 * Initializes the subtask editing functionality by displaying the appropriate controls.
 */
function initSubtaskForEdit() {
  showSubtaskControlsForEdit(); 
}

/**
 * Adds a new subtask to the specified task and updates the UI.
 * @param {string} arrayName - The name of the array containing the task.
 * @param {number} i - The index of the task in the array.
 */
function addedNewSubtaskInEdit(arrayName, i) {
  let subtaskListForEdit = document.getElementById("subtaskListForEdit");
  let subtaskInput = document.getElementById("subtaskInput").value;
  let subtask = { completed: false, name: subtaskInput };
  let task = checkwhichArray(arrayName, i);
  task.subtask.push(subtask);
  subtaskListForEdit.innerHTML = "";
  loadSubtasksDetailsForEdit(task);
  deleteInput();
}

/**
 * Checks the length of the new subtask input and enables or disables the confirmation button accordingly.
 */
function checkLengthInputNewSubtask() {
  let inputNewSubtaskEdit = document.getElementById("subtaskInput").value;
  let subtaskCheck = document.getElementById("subtaskCheck");
  getErrorMessagesEditNewSubtask(inputNewSubtaskEdit);
  if (inputNewSubtaskEdit.length < 3) {
    subtaskCheck.disabled = true; 
    subtaskCheck.classList.add("disable");
  } else {
    subtaskCheck.disabled = false; 
    subtaskCheck.classList.remove("disable");
  }
}

/**
 * Displays or hides error messages based on the validity of the new subtask input.
 * @param {string} inputSubtaskEdit - The new subtask input text.
 */
function getErrorMessagesEditNewSubtask(inputSubtaskEdit) {
  let errorMessageEditSubtask = document.getElementById(`errorMessageEditNewSubtask`);
  if (inputSubtaskEdit.length < 3) {
    errorMessageEditSubtask.classList.remove("d-none");
  } else {
    errorMessageEditSubtask.classList.add("d-none");
  }
}

/**
 * Toggles the visibility of subtask controls in edit mode.
 */
function showSubtaskControlsForEdit() {
  let subtaskControlButton = document.getElementById("subtaskControlButton");
  let subtaskAddIcon = document.getElementById("subtaskAddIcon");
  subtaskControlButton.classList.toggle("d-none"); 
  subtaskAddIcon.classList.toggle("d-none");
}

/**
 * Clears the subtask input field and hides associated error messages.
 */
function deleteInput() {
  let subtaskInput = document.getElementById("subtaskInput");
  let errorMessageEditSubtask = document.getElementById(`errorMessageEditNewSubtask`);
  errorMessageEditSubtask.classList.add("d-none");
  subtaskInput.value = ""; 
  showSubtaskControlsForEdit(); 
}

/**
 * Saves the edited subtask input and updates the task data.
 * @param {number} taskId - The ID of the task being edited.
 * @param {number} i - The index of the subtask in the task's subtask array.
 */
function saveInputSubtaskInEdit(taskId, i) {
  let inputSubtaskEdit = document.getElementById("inputSubtaskEdit").value;
  let task = tasks[taskId];
  if (task && task.subtask[i]) {
    if (task.subtask[i].name === inputSubtaskEdit) {
      loadSubtasksDetailsForEdit(task); 
      return;
    }
    task.subtask[i].name = inputSubtaskEdit;
    loadSubtasksDetailsForEdit(task);
  }
}

/**
 * Checks the length of the edited subtask input and enables or disables the save button accordingly.
 */
function checkLengthInput() {
  let inputSubtaskEdit = document.getElementById("inputSubtaskEdit").value;
  let changButton = document.getElementById("changButton");
  getErrorMessagesEdit(inputSubtaskEdit);
  if (inputSubtaskEdit.length < 3) {
    changButton.disabled = true; 
  } else {
    changButton.disabled = false; 
  }
}

/**
 * Displays or hides error messages based on the validity of the edited subtask input.
 * @param {string} inputSubtaskEdit - The edited subtask input text.
 */
function getErrorMessagesEdit(inputSubtaskEdit) {
  let errorMessageEditSubtask = document.getElementById(
    `errorMessageEditSubtask`
  );
  if (inputSubtaskEdit.length < 3) {
    errorMessageEditSubtask.classList.remove("d-none");
  } else {
    errorMessageEditSubtask.classList.add("d-none");
  }
}

/**
 * Clears the subtask input field for editing and reloads the task's subtasks.
 * @param {number} taskId - The ID of the task being edited.
 */
function deleteInputSubtaskInEdit(taskId) {
  document.getElementById("inputSubtaskEdit").value = ""; 
  loadSubtasksDetailsForEdit(tasks[taskId]); 
}

/**
 * Deletes a specific subtask from a task's subtask array.
 * @param {number} taskId - The ID of the task.
 * @param {number} subtaskIndex - The index of the subtask to delete.
 */
function deleteSubtaskInEdit(taskId, subtaskIndex) {
  let currentTask = tasks[taskId];
  currentTask.subtask.splice(subtaskIndex, 1); 
  loadSubtasksDetailsForEdit(currentTask); 
}

/**
 * Toggles the visibility of the contact dropdown for editing a task.
 * @param {string} arrayName - The name of the array containing the task.
 * @param {number} i - The index of the task in the array.
 */
function toggleContactDropdownForEdit(arrayName, i) {
  let task = checkwhichArray(arrayName, i);
  let dropdown = document.getElementById("contactDropDownForEdit");
  dropdown.classList.toggle("show"); 
  loadContactsInListForEdit(task, arrayName, i); 
}

/**
 * Loads the list of contacts into the contact dropdown for editing.
 * @param {object} task - The task being edited.
 * @param {string} arrayName - The name of the array containing the task.
 * @param {number} taskIndex - The index of the task in the array.
 */
function loadContactsInListForEdit(task, arrayName, taskIndex) {
  let contactDropDownForEdit = document.getElementById(
    "contactDropDownForEdit"
  );
  contactDropDownForEdit.innerHTML = ""; 
  contacts.forEach((contact, i) => {
    let contactInitials = getInitials(contact.name); 
    contactDropDownForEdit.innerHTML += getContactsTemplates(
      contact,
      i,
      contactInitials,
      arrayName,
      taskIndex
    ); 
    document.getElementById(`contact-initials${i}`).style.backgroundColor =
      getColorByIndex(i); 
  });
  markAssignedContacts(task); 
}

/**
 * Marks the contacts assigned to the task as selected in the UI.
 * @param {object} task - The task being edited.
 */
function markAssignedContacts(task) {
  let assignedContacts = task.assignedto || [];
  contacts.forEach((contact, i) => {
    let checkbox = document.getElementById(`contact-checkbox-${i}`);
    let contactInList = document.getElementById(`contactInList-${i}`);
    if (checkbox) {
      checkbox.checked = assignedContacts.includes(contact.id); 
      if (checkbox.checked) {
        contactInList.classList.add("selected");
      } else {
        contactInList.classList.remove("selected");
      }
    }
  });
}

/**
 * Toggles the selection of a contact for a task and updates the UI.
 * @param {string} arrayName - The name of the array containing the task.
 * @param {number} i - The index of the task in the array.
 * @param {number} contactId - The ID of the contact being toggled.
 */
function toggleContactSelection(arrayName, i, contactId) {
  let task = checkwhichArray(arrayName, i);
  let assignedToContainer = document.getElementById("assignedToContainer");
  if (task.assignedto.includes(contactId)) {
    task.assignedto.splice(task.assignedto.indexOf(contactId), 1); 
  } else {
    task.assignedto.push(contactId); 
  }
  markAssignedContacts(task);
  renderAssignedContacts(task.assignedto, assignedToContainer); 
}

/**
 * Retrieves the selected priority level from the active priority button.
 * @returns {string} - The selected priority level (e.g., "Urgent", "Medium", "Low").
 */
function getSelectedPriority() {
  const activeButton = document.querySelector(".priority-button.active"); 
  if (activeButton) {
    return mapButtonToPriority(activeButton.id); 
  }
  return "low"; 
}

/**
 * Saves the edits made to a task, including title, description, date, and priority.
 * @param {string} arrayName - The name of the array containing the task.
 * @param {number} i - The index of the task in the array.
 */
async function saveEdits(arrayName, i) {
  let task = checkwhichArray(arrayName, i);
  clearInputs();
  task.titel = document.getElementById("editTitle").value.trim();
  task.description = document.getElementById("editDescription").value.trim();
  task.date = document.getElementById("editDate").value;
  task.priority = getSelectedPriority();

  await updateTaskInAPI(task.id, task);
  closeTaskOverlay();
  loadTasksToBoard();
  checkUpdateProgressFromEdit(task, i, arrayName);
}

/**
 * Updates the progress bar for subtasks in the UI.
 * @param {object} task - The task being updated.
 * @param {number} i - The index of the task in the array.
 * @param {string} arrayName - The name of the array containing the task.
 */
function checkUpdateProgressFromEdit(task, i, arrayName) {
  if (task && Array.isArray(task.subtask)) {
    let totalSubtasks = task.subtask.filter(
      (subtask) => subtask.name.trim() !== ""
    ).length;
    let completedSubtasks = task.subtask.filter(
      (subtask) => subtask.completed && subtask.name.trim() !== ""
    ).length;
    if (totalSubtasks > 0) {
      document
        .getElementById(`progressContainer-${arrayName}-${i}`)
        ?.classList.remove("d-none");
    }
    let progressElement = document.getElementById(`subtask-progress-${task.titel}`);
    if (progressElement) {
      progressElement.textContent = `${completedSubtasks}/${totalSubtasks} Subtasks`;
    }
    setProgressBar(task.titel, completedSubtasks, totalSubtasks);
  }
}

/**
 * Updates a task in the API with the provided data.
 * @param {number} taskId - The ID of the task to update.
 * @param {object} updatedTask - The updated task data.
 */
async function updateTaskInAPI(taskId, updatedTask) {
  let response = await fetch(`${BASE_URL}tasks/${taskId}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTask),
  });
}

/**
 * Maps a priority button ID to its corresponding priority level.
 * @param {string} buttonId - The ID of the priority button.
 * @returns {string} - The priority level (e.g., "Urgent", "Medium", "Low").
 */
function mapButtonToPriority(buttonId) {
  const priorityMap = {
    btn1: "Urgent",
    btn2: "Medium",
    btn3: "Low",
  };
  return priorityMap[buttonId] || "low"; 
}
