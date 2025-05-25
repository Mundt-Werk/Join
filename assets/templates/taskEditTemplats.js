function editTask(i, arrayName) {
  let task = checkwhichArray(arrayName, i);
  let opentaskcontainer = document.getElementById("open-task-container");
  opentaskcontainer.innerHTML = "";
  opentaskcontainer.innerHTML = `
     <div class="edit-task-head">
         <div class="cursor-pointer">
             <img src="../assets/img/icons/board/opentask/Close.png" alt="Close" onclick="closeTaskOverlay()">
         </div>
     </div>
     <div class="edit-task-container">
     <p>Title</p> 
       <textarea id="editTitle">${task.titel}</textarea>
     <p>Description</p> 
       <textarea id="editDescription">${task.description}</textarea>
     <p>Due date</p>
       <input required id="editDate" name="editDate" id="clear-due-date"
         class="task-due-date" type="date" placeholder="dd/mm/yyyy" />
        <section id="priority_section_desktop" class="priority-section">
         <div class="form-label">Priority</div>
         <div id="priority_button_container_desktop" class="priority-button-container">
           <button id="btn1" id="priority_button_urgent_desktop" onclick="setPriority('urgent')
             "class="priority-button">Urgent
               <svg class="svg-urgent" width="21" height="15" viewBox="0 0 21 15" fill="none"
               xmlns="http://www.w3.org/2000/svg">
               <path
                 d="M19.5712 14.7547C19.3366 14.7551 19.1081 14.6803 18.9192 14.5412L10.6671 8.458L2.41508 14.5412C2.29923 14.6267 2.16765 14.6887 2.02785 14.7234C1.88805 14.7582 1.74277 14.7651 1.6003 14.7437C1.45783 14.7223 1.32097 14.6732 1.19752 14.599C1.07408 14.5247 0.966466 14.427 0.880837 14.3112C0.795208 14.1954 0.733236 14.0639 0.698459 13.9243C0.663683 13.7846 0.656782 13.6394 0.678153 13.497C0.721312 13.2095 0.877002 12.9509 1.11097 12.7781L10.0151 6.20761C10.2038 6.06802 10.4324 5.99268 10.6671 5.99268C10.9019 5.99268 11.1305 6.06802 11.3192 6.20761L20.2233 12.7781C20.4092 12.915 20.5471 13.1071 20.6173 13.327C20.6874 13.5469 20.6862 13.7833 20.6139 14.0025C20.5416 14.2216 20.4019 14.4124 20.2146 14.5475C20.0274 14.6826 19.8022 14.7551 19.5712 14.7547Z"
                  fill="#FF3D00" />
                <path
                  d="M19.5713 9.00568C19.3366 9.00609 19.1081 8.93124 18.9192 8.79214L10.6671 2.70898L2.41509 8.79214C2.18112 8.96495 1.88803 9.0378 1.6003 8.99468C1.31257 8.95155 1.05378 8.79597 0.880842 8.56218C0.707906 8.32838 0.634998 8.03551 0.678157 7.74799C0.721316 7.46048 0.877007 7.20187 1.11098 7.02906L10.0151 0.458588C10.2038 0.318997 10.4324 0.243652 10.6671 0.243652C10.9019 0.243652 11.1305 0.318997 11.3192 0.458588L20.2233 7.02906C20.4092 7.16598 20.5471 7.35809 20.6173 7.57797C20.6874 7.79785 20.6863 8.03426 20.6139 8.25344C20.5416 8.47262 20.4019 8.66338 20.2146 8.79847C20.0274 8.93356 19.8022 9.00608 19.5713 9.00568Z"
                  fill="#FF3D00" />
              </svg>
            </button>
           <button id="btn2" id="priority_button_medium_desktop" onclick="setPriority('medium')"
             class="priority-button priority-marked-medium active">
             Medium
             <svg class="svg-medium" width="18" height="8" viewBox="0 0 18 8" fill="none"
               xmlns="http://www.w3.org/2000/svg">
               <path
                 d="M16.5685 7.16658L1.43151 7.16658C1.18446 7.16658 0.947523 7.06773 0.772832 6.89177C0.598141 6.71581 0.5 6.47716 0.5 6.22831C0.5 5.97947 0.598141 5.74081 0.772832 5.56485C0.947523 5.38889 1.18446 5.29004 1.43151 5.29004L16.5685 5.29004C16.8155 5.29004 17.0525 5.38889 17.2272 5.56485C17.4019 5.74081 17.5 5.97947 17.5 6.22831C17.5 6.47716 17.4019 6.71581 17.2272 6.89177C17.0525 7.06773 16.8155 7.16658 16.5685 7.16658Z"
                 fill="#FFA800" />
               <path
                 d="M16.5685 2.7098L1.43151 2.7098C1.18446 2.7098 0.947523 2.61094 0.772832 2.43498C0.598141 2.25902 0.5 2.02037 0.5 1.77152C0.5 1.52268 0.598141 1.28403 0.772832 1.10807C0.947523 0.932105 1.18446 0.833252 1.43151 0.833252L16.5685 0.833252C16.8155 0.833252 17.0525 0.932105 17.2272 1.10807C17.4019 1.28403 17.5 1.52268 17.5 1.77152C17.5 2.02037 17.4019 2.25902 17.2272 2.43498C17.0525 2.61094 16.8155 2.7098 16.5685 2.7098Z"
                 fill="#FFA800" />
             </svg>
           </button>
            <button id="btn3" id="priority_button_low_desktop" onclick="setPriority('low')" class="priority-button">
              Low
              <svg class="svg-low" width="21" height="15" viewBox="0 0 21 15" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.334 9.00589C10.0994 9.0063 9.87085 8.93145 9.682 8.79238L0.778897 2.22264C0.663059 2.13708 0.565219 2.02957 0.490964 1.90623C0.416709 1.78289 0.367492 1.64614 0.346125 1.50379C0.30297 1.21631 0.37587 0.923473 0.548786 0.689701C0.721702 0.455928 0.980471 0.300371 1.26817 0.257248C1.55586 0.214126 1.84891 0.286972 2.08286 0.45976L10.334 6.54224L18.5851 0.45976C18.7009 0.374204 18.8325 0.312285 18.9723 0.277538C19.1121 0.242791 19.2574 0.235896 19.3998 0.257248C19.5423 0.2786 19.6791 0.32778 19.8025 0.401981C19.926 0.476181 20.0336 0.573948 20.1192 0.689701C20.2048 0.805453 20.2668 0.936923 20.3015 1.07661C20.3363 1.21629 20.3432 1.36145 20.3218 1.50379C20.3005 1.64614 20.2513 1.78289 20.177 1.90623C20.1027 2.02957 20.0049 2.13708 19.8891 2.22264L10.986 8.79238C10.7971 8.93145 10.5686 9.0063 10.334 9.00589Z"
                  fill="#7AE229" />
                <path
                  d="M10.334 14.7544C10.0994 14.7548 9.87085 14.68 9.682 14.5409L0.778897 7.97117C0.544952 7.79839 0.389279 7.53981 0.346125 7.25233C0.30297 6.96485 0.37587 6.67201 0.548786 6.43824C0.721702 6.20446 0.980471 6.04891 1.26817 6.00578C1.55586 5.96266 1.84891 6.03551 2.08286 6.2083L10.334 12.2908L18.5851 6.2083C18.8191 6.03551 19.1121 5.96266 19.3998 6.00578C19.6875 6.04891 19.9463 6.20446 20.1192 6.43824C20.2921 6.67201 20.365 6.96485 20.3218 7.25233C20.2787 7.53981 20.123 7.79839 19.8891 7.97117L10.986 14.5409C10.7971 14.68 10.5686 14.7548 10.334 14.7544Z"
                  fill="#7AE229" />
              </svg>
            </button>
          </div>
        </section>
         <section class="assign-container">
           <div class="form-label">Assign to</div>
           <div class="dropdown-menu5" onclick="toggleContactDropdownForEdit('${arrayName}', ${i})">
             Select contacts<img id="arrow_icon_contacts" class="dropdown-arrow-icon"
               src="../assets/img/add-task/arrow_drop_down.svg" />
           </div>
           <ul id="contactDropDownForEdit" class="contact-list dropdown-list"></ul>
           <div id="assigned_contacts_container" class="assigned-contacts"></div>
         </section>
         <div class="edit-task-assigned-to-container" id="assignedToContainer">
         </div>
         <section>
           <div class="form-label">Subtasks</div>
           <div id="subtaskInputWrapper" class="subtask-edit-container">
             <input onkeyup="checkLengthInputNewSubtask()" id="subtaskInput" id="clear-subtask" type="text" placeholder="Add new subtask"/>
              <div id="subtaskControls" class="subtask-controls">
                <div id="subtaskControlButton" class="subtask-controll-buttons-edit d-none">
                  <button onclick="deleteInput()" id="subtaskCancel" class="">
                   <img src="../assets/img/add-task/close.svg"/>
                  </button>
                  <div class="subtask-divider"></div>
                  <button class="" onclick="addedNewSubtaskInEdit('${arrayName}', ${i})" id="subtaskCheck">
                   <img src="../assets/img/add-task/checkBlack.svg"/>
                  </button>
                </div>
                <img class="cursor-pointer" onclick="initSubtaskForEdit(${i})" id="subtaskAddIcon" src="../assets/img/add-task/plus.svg" />
              </div>
           </div>
           <span id="errorMessageEditNewSubtask" class="error-message d-none">
              Please enter more then 3 characters. Thank you.
            </span>
           <div class="before-subtask">
             <ul id="subtaskListForEdit" class="subtask-list"></ul>
               <span id="errorMessageEditSubtask" class="error-message d-none">
                 Please enter more then 3 characters. Thank you.
               </span>
           </div>
         </section>
         </div>
         <div class="save-edit-task">
          <button onclick="saveEdits('${arrayName}', ${i})" class="create-task-btn blue-button">
           <span>Ok &#10003</span>
          </button>
         </div>
 `;
  setMinimumDateForEdit();
  loadAssignedToDetailsForEdit(task);
  loadSubtasksDetailsForEdit(task);
}

/**
 * Loads and displays the assigned team members' details for editing a task.
 * Each assigned member's initials are displayed in a circle with a dynamic background color.
 *
 * @param {Object} task - The task object containing the assigned team members.
 * @param {Array} task.assignedto - An array of names (strings) representing the assigned team members.
 *
 * @description
 * This function clears the content of the 'assignedToContainer' element and iterates over the list
 * of assigned team members from the task object. It creates a visual representation for each member,
 * including their initials and a dynamic background color, and appends it to the container.
 */
function loadAssignedToDetailsForEdit(task) {
  let assignedToContainer = document.getElementById("assignedToContainer");
  assignedToContainer.innerHTML = "";
  for (let i = 0; i < task.assignedto.length; i++) {
    let name = task.assignedto[i];
    let initials = getInitials(name);
    assignedToContainer.innerHTML += `
          <div class="profile-name-assign">
           <div id="imageProfil${i}" class="circle">
             ${initials}
           </div>
          </div>
          `;
    document.getElementById(`imageProfil${i}`).style.backgroundColor =
      getColorByIndex(i);
  }
}

/**
 * Loads and displays the subtasks for editing within a task.
 * It dynamically generates a list of subtasks, providing options to edit or delete each subtask.
 *
 * @param {Object} task - The task object containing the subtasks to be displayed.
 * @param {Array} task.subtask - An array of subtasks, where each subtask is an object with a 'name' property.
 * @param {number} task.id - The unique identifier for the task being edited.
 *
 * @description
 * This function clears the 'subtaskListForEdit' container and filters out empty subtasks.
 * If there are valid subtasks, it dynamically creates list items with buttons to edit or delete each subtask.
 * Each button triggers an action with the corresponding task ID, subtask index, and subtask name.
 */
function loadSubtasksDetailsForEdit(task) {
  let subtaskListForEdit = document.getElementById("subtaskListForEdit");
  subtaskListForEdit.innerHTML = "";

  let totalSubtasks = task.subtask.filter(
    (subtask) => subtask.name.trim() !== ""
  );

  if (totalSubtasks == 0) {
    subtaskListForEdit.innerHTML = "";
  } else {
    task.subtask.forEach((subtask, i) => {
      subtaskListForEdit.innerHTML += `
          <li id="subtaskList-${i}" class="subtask-list-item li-in-subtaks">
             <span>${subtask.name}</span>
            <div class="subtask-buttons">
             <button onclick="editSubtaskInEdit(${task.id}, ${i}, '${subtask.name}')" class="subtask-edit-btn editButtons">
               <img src="../assets/img/add-task/edit_dark.svg" alt="Edit">
             </button>
             <button onclick="deleteSubtaskInEdit(${task.id}, ${i})" class="subtask-edit-btn editButtons">
               <img src="../assets/img/add-task/delete.svg" alt="Delete">
             </button>
            </div>
          </li>
        `;
    });
  }
}

/**
 * Generates the HTML template for a single contact in a contact list.
 * Each contact includes initials, name, and a checkbox for selection.
 *
 * @param {Object} contact - The contact object containing details of the contact.
 * @param {number} contact.id - The unique identifier for the contact.
 * @param {number} i - The index of the contact in the list.
 * @param {string} contactInitials - The initials of the contact's name.
 * @param {string} arrayName - The name of the array managing the contact list.
 * @param {number} taskIndex - The index of the task to which the contact is being assigned.
 *
 * @returns {string} - A string containing the HTML template for the contact item.
 *
 * @description
 * This function creates a list item (`<li>`) for a contact, including:
 * - A clickable area to handle contact selection.
 * - A visual display of the contact's initials and name.
 * - A checkbox for toggling the contact's selection status.
 * The list item dynamically triggers actions via `onclick` and `onchange` events.
 */
function getContactsTemplates(contact, i, contactInitials, arrayName, taskIndex) {
  return `
    <li onclick="handleContactSelection(event, '${arrayName}', ${taskIndex}, '${contact.id}', ${i})" 
        id="contactInList-${i}" class="contact-edit-list">
      <div class="contact-item">
        <span id="contact-initials${i}" class="contact-initials">${contactInitials}</span>
        <label>${contact.name}</label>
      </div>
      <input
        type="checkbox" 
        id="contact-checkbox-${i}" 
        class="contact-checkbox cursor-pointer" 
        onchange="toggleContactSelection('${arrayName}', ${taskIndex}, '${contact.id}')">
    </li>
  `;
}

/**
 * Renders the assigned contacts into a specified container element.
 * Each contact is displayed with their initials in a circle, and a dynamic background color is applied.
 *
 * @param {Array} assignedContacts - An array of contact identifiers representing the assigned contacts.
 * @param {HTMLElement} container - The DOM element where the assigned contacts will be rendered.
 *
 * @description
 * This function generates HTML content for each assigned contact, displaying their initials inside a circle.
 * The background color of each circle is dynamically determined using the contact's index.
 * The generated HTML is inserted into the container element.
 */
function renderAssignedContacts(assignedContacts, container) {
  container.innerHTML = assignedContacts.map((contactId, i) => {
    let initials = getInitials(contactId);
    return `<div class="profile-name-assign">
              <div id="imageProfil${i}" class="circle">${initials}</div>
            </div>`;
  }).join("");

  assignedContacts.forEach((_, i) => {
    document.getElementById(`imageProfil${i}`).style.backgroundColor = getColorByIndex(i);
  });
}

/**
 * Aktiviert den Bearbeitungsmodus für einen Subtask und rendert die entsprechenden Eingabeelemente.
 * @param {number} taskId - Die ID des Tasks, der bearbeitet wird.
 * @param {number} i - Der Index des Subtasks im Task.
 */
function editSubtaskInEdit(taskId, i, subtaskName) {
 let subtaskList = document.getElementById(`subtaskList-${i}`);
   subtaskList.innerHTML = `
   <input onkeyup="checkLengthInput()" value="${subtaskName}" id="inputSubtaskEdit"></input>
   <div class="subtask-buttons-edit">
     <button onclick="deleteInputSubtaskInEdit(${taskId})" class="subtask-delete editButtons">
       <img src="../assets/img/add-task/delete.svg" alt="Delete">
     </button>
     <button id="changButton" onclick="saveInputSubtaskInEdit(${taskId}, ${i})" class="subtask-edit editButtons">
       <img src="../assets/img/icons/contacts/check_blue.png" alt="Edit">
     </button>
   </div> 
 `; // Erstellt Eingabefelder und Bearbeitungs-/Lösch-Schaltflächen
}