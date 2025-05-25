/**
 * Returns the appropriate category class based on the task type.
 * @param {string} category - The category of the task (e.g., "User Story", "Design", "Technical Task").
 * @returns {string} - The class name to be added.
 */
function getCategoryClass(category) {
  if (category === "User Story") return "category-userstory";
  if (category === "Design") return "category-design";
  if (category === "Technical Task") return "category-technical";
  return ""; // If no category matches, no additional class is added
}

/**
 * Generates the HTML template for a "To-Do" task and appends it to the board.
 * @param {Object} todo - The task object containing task details.
 * @param {string} arrayName - The name of the array the task belongs to.
 * @param {number} i - The index of the task in the array.
 */
function getTodoTemplates(todo, arrayName, i) {
  let hasValidSubtasks = checkSubtask(todo);
  const categoryClass = getCategoryClass(todo.category); // Determine category class

  return (toDoTasks.innerHTML = `
   <div class="task" id="task-${i}" draggable="true" ondragstart="startDragging('${arrayName}', ${i})" onclick="openTaskOverlay('${arrayName}', ${i})">
      <div class="category">
       <p class="categorie ${categoryClass}">${todo.category || "Uncategorized"}</p>
        <div class="moblie-buttons">
         <button onclick="event.stopPropagation(); switchTaskDown('${todo.status}', ${todo.id})" class="switch-buttons">&darr;</button>
        </div>
      </div>
      <h3 class="task-title">${todo.titel || "No Title"}</h3>
      <p class="task-desc margin-botto-16px">${todo.description || "No Description"}</p>
     <div id="progressContainer-${arrayName}-${i}" class="progress-container d-none">
       <div id="progress-bar-${todo.titel}" class="progressbar">
         <div class="progressbar-fill"></div>
       </div>
       <p id="subtask-progress-${todo.titel}">0/${hasValidSubtasks} Subtasks</p>
     </div>
     <div class="profil-infos">
        <div id="assignedNameTodoBoard${i}" class="assigned-to-name">
        </div>
       <div class="priority">
       <img src="../assets/img/icons/board/${todo.priority}.png" alt="${
    todo.priority
  }">
       </div>
      </div>
   </div>
  `);
}

/**
 * Generates the HTML template for an "In Progress" task and appends it to the board.
 * @param {Object} inProgress - The task object containing task details.
 * @param {string} arrayName - The name of the array the task belongs to.
 * @param {number} i - The index of the task in the array.
 */
function getInProgressTemplates(inProgress, arrayName, i) {
  let hasValidSubtasks = checkSubtask(inProgress);
  const categoryClass = getCategoryClass(inProgress.category); // Determine category class

  return (inProgressTasks.innerHTML = `
   <div class="task" id="task-${i}" draggable="true" ondragstart="startDragging('${arrayName}', ${i})" onclick="openTaskOverlay('${arrayName}', ${i})">
      <div class="category">
       <p class="categorie ${categoryClass}">${inProgress.category || "Uncategorized"}</p>
        <div class="moblie-buttons">
         <button onclick="event.stopPropagation(); switchTaskUp('${inProgress.status}', ${inProgress.id})" class="switch-buttons">&uarr;</button>
         <button onclick="event.stopPropagation(); switchTaskDown('${inProgress.status}', ${inProgress.id})" class="switch-buttons">&darr;</button>
        </div>
      </div>
      <h3 class="task-title">${inProgress.titel || "No Title"}</h3>
      <p class="task-desc margin-botto-16px">${inProgress.description || "No Description"}</p>
     <div id="progressContainer-${arrayName}-${i}" class="progress-container d-none">
       <div id="progress-bar-${inProgress.titel}" class="progressbar">
         <div class="progressbar-fill"></div>
       </div>
       <p id="subtask-progress-${
         inProgress.titel
       }">0/${hasValidSubtasks} Subtasks</p>
     </div>
     <div class="profil-infos">
        <div id="assignedNameInProgressBoard${i}" class="assigned-to-name">
        </div>
       <div class="priority">
         <img src="../assets/img/icons/board/${inProgress.priority}.png" alt="${
    inProgress.priority
  }">
       </div>
      </div>
   </div>
  `);
}

/**
 * Generates the HTML template for an "Awaiting Feedback" task and appends it to the board.
 * @param {Object} awaitingFeedback - The task object containing task details.
 * @param {string} arrayName - The name of the array the task belongs to.
 * @param {number} i - The index of the task in the array.
 */
function getAwaitingFeedbackTemplates(awaitingFeedback, arrayName, i) {
  let hasValidSubtasks = checkSubtask(awaitingFeedback);
  const categoryClass = getCategoryClass(awaitingFeedback.category); // Determine category class

  return (awaitingFeedbackTasks.innerHTML = `
    <div class="task" id="task-${i}" draggable="true" ondragstart="startDragging('${arrayName}', ${i})" onclick="openTaskOverlay('${arrayName}', ${i})">
      <div class="category">
        <p class="categorie ${categoryClass}">${awaitingFeedback.category || "Uncategorized"}</p>
        <div class="moblie-buttons">
         <button onclick="event.stopPropagation(); switchTaskUp('${awaitingFeedback.status}', ${awaitingFeedback.id})" class="switch-buttons">&uarr;</button>
         <button onclick="event.stopPropagation(); switchTaskDown('${awaitingFeedback.status}', ${awaitingFeedback.id})" class="switch-buttons" class="switch-buttons">&darr;</button>
        </div>
      </div>
       <h3 class="task-title">${awaitingFeedback.titel || "No Title"}</h3>
       <p class="task-desc margin-botto-16px">${
         awaitingFeedback.description || "No Description"
       }</p>
      <div id="progressContainer-${arrayName}-${i}" class="progress-container d-none">
       <div id="progress-bar-${awaitingFeedback.titel}" class="progressbar">
        <div class="progressbar-fill"></div>
       </div>
       <p id="subtask-progress-${
         awaitingFeedback.titel
       }">0/${hasValidSubtasks} Subtasks</p>
      </div>
      <div class="profil-infos">
        <div id="assignedNameAwaitingFeedbackBoard${i}" class="assigned-to-name">
        </div>
        <div class="priority">
        <img src="../assets/img/icons/board/${
          awaitingFeedback.priority
        }.png" alt="${awaitingFeedback.priority}">
        </div>
       </div>
    </div>
  `);
}

/**
 * Generates the HTML template for a "Done" task and appends it to the board.
 * @param {Object} done - The task object containing task details.
 * @param {string} arrayName - The name of the array the task belongs to.
 * @param {number} i - The index of the task in the array.
 */
function getDoneTemplates(done, arrayName, i) {
  let hasValidSubtasks = checkSubtask(done);
  const categoryClass = getCategoryClass(done.category); // Determine category class

  return (doneTasks.innerHTML = `
    <div class="task" id="task-${i}" draggable="true" ondragstart="startDragging('${arrayName}', ${i})" onclick="openTaskOverlay('${arrayName}', ${i})">
       <div class="category">
        <p class="categorie ${categoryClass}">${done.category || "Uncategorized"}</p>
        <div class="moblie-buttons">
         <button 
         onclick="event.stopPropagation(); switchTaskUp('${done.status}', ${done.id})" 
         class="switch-buttons">
         &uarr;
         </button>
        </div>
       </div>
       <h3 class="task-title">${done.titel || "No Title"}</h3>
       <p class="task-desc margin-botto-16px">${done.description || "No Description"}</p>
       <div id="progressContainer-${arrayName}-${i}" class="progress-container d-none">
        <div id="progress-bar-${done.titel}" class="progressbar">
         <div class="progressbar-fill"></div>
       </div>
       <p id="subtask-progress-${done.titel}">0/${hasValidSubtasks} Subtasks</p>
      </div>
      <div class="profil-infos">
        <div id="assignedNameDoneBoard${i}" class="assigned-to-name">
        </div>
        <div class="priority">
        <img src="../assets/img/icons/board/${done.priority}.png" alt="${
    done.priority
  }">
        </div>
       </div>
    </div>
  `);
}

/**
 * Generates the detailed task view template and inserts it into the overlay container.
 * @param {Object} task - The task object containing detailed information.
 * @param {number} i - The index of the task in the array.
 * @param {string} arrayName - The name of the array the task belongs to.
 */
function getDetailsTemplates(task, i, arrayName) {
  let overlaycontainer = document.getElementById("taskoverlaycontainer");
  overlaycontainer.innerHTML = "";

  let categoryClass = getCategoryClass(task.category);
  return (overlaycontainer.innerHTML = `
      <div id="open-task-container" class="open-task-container">
          <div class="open-task-head">
              <div class="category">
                  <p class="${categoryClass}">${task.category}</p>
              </div>
              <div class="cursor-pointer">
                  <img src="../assets/img/icons/board/opentask/Close.png" alt="Close" onclick="closeTaskOverlay()">
              </div>
          </div>
          <h3>${task.titel}</h3>
          <p>${task.description}</p>
          <div class="open-task-date-priority">
              <div class="open-task-date-priority-status">
                  <div class="date-container">
                    <p>Due date:</p>
                    <p>${task.date}</p>
                  </div>
                  <div class="priority-container">
                    <p>Priority:</p>
                    <p>${task.priority}</p>
                    <img src="../assets/img/icons/board/${task.priority}.png">
                  </div>
              </div>
              <div class="assigned-to-container-main">
                <p class="margin-bottom-16px">Assigned To:<p>
                <div class="assigned-to-container" id="assignedToContainer">
                </div>
              </div>
          </div>
          <div class="subtasks">
              <div>
               <p>Subtasks</p>
                <div class="subtasks-container" id="detailsSubtasks"></div>
              </div>
          </div>
          <div class="open-task-delete-edit-container">
              <div id="delete-button-${i}" onclick="openDeleteConfirmationModal(${i}, '${arrayName}')" class="delete-edit-content cursor-pointer">
                  <img class="img-delete-edit-container delete-button" src="../assets/img/icons/contacts/Delete contact.png" alt="Delete">
              </div>
              <div class="separator"></div>
              <div id="edit-button-${i}" onclick="editTask(${i}, '${arrayName}')" class="delete-edit-content cursor-pointer">
                  <img class="img-delete-edit-container edit-button" src="../assets/img/icons/contacts/edit contacts.png" alt="Edit">
              </div>
          </div>
      </div>
  `);
}

/**
 * Appends the assigned names to the "To-Do" task template.
 * @param {Object} todo - The task object containing assigned names.
 * @param {number} i - The index of the task in the array.
 */
function getTodoAssignedName(todo, i) {
  let assignedNameTodoBoard = document.getElementById(
    `assignedNameTodoBoard${i}`
  );

  for (let j = 0; j < todo.assignedto.length; j++) {
    let name = todo.assignedto[j];
    let initials = getInitials(name);
    assignedNameTodoBoard.innerHTML += `
      <div id="nameToDo${i}-${j}" class="circle-for-board">
        <div id="imageName${i}-${j}">
          <p>${initials}</p>
        </div>
      </div>`;
    document.getElementById(`nameToDo${i}-${j}`).style.backgroundColor =
      getColorByIndex(j);
  }
}

/**
 * Appends the assigned names to the "In Progress" task template.
 * @param {Object} inProgress - The task object containing assigned names.
 * @param {number} i - The index of the task in the array.
 */
function getInProgressAssignedName(inProgress, i) {
  let assignedNameInProgressBoard = document.getElementById(
    `assignedNameInProgressBoard${i}`
  );
  for (let j = 0; j < inProgress.assignedto.length; j++) {
    let name = inProgress.assignedto[j];
    let initials = getInitials(name);
    assignedNameInProgressBoard.innerHTML += `
      <div id="nameInProgress${i}-${j}" class="circle-for-board">
        <div id="imageName${i}-${j}">
          <p>${initials}</p>
        </div>
      </div>`;
    document.getElementById(`nameInProgress${i}-${j}`).style.backgroundColor =
      getColorByIndex(j);
  }
}

/**
 * Appends the assigned names to the "Awaiting Feedback" task template.
 * @param {Object} awaitingFeedback - The task object containing assigned names.
 * @param {number} i - The index of the task in the array.
 */
function getAwaitingFeedbackAssignedName(awaitingFeedback, i) {
  let assignedNameAwaitingFeedbackBoard = document.getElementById(
    `assignedNameAwaitingFeedbackBoard${i}`
  );
  for (let j = 0; j < awaitingFeedback.assignedto.length; j++) {
    let name = awaitingFeedback.assignedto[j];
    let initials = getInitials(name);
    assignedNameAwaitingFeedbackBoard.innerHTML += `
      <div id="nameAwaitingFeedback${i}-${j}" class="circle-for-board">
        <div id="imageName${i}-${j}">
          <p>${initials}</p>
        </div>
      </div>`;
    document.getElementById(
      `nameAwaitingFeedback${i}-${j}`
    ).style.backgroundColor = getColorByIndex(j);
  }
}

/**
 * Appends the assigned names to the "Done" task template.
 * @param {Object} done - The task object containing assigned names.
 * @param {number} i - The index of the task in the array.
 */
function getDoneAssignedName(done, i) {
  let assignedNameDoneBoard = document.getElementById(
    `assignedNameDoneBoard${i}`
  );
  for (let j = 0; j < done.assignedto.length; j++) {
    let name = done.assignedto[j];
    let initials = getInitials(name);
    assignedNameDoneBoard.innerHTML += `
      <div id="nameDone${i}-${j}" class="circle-for-board">
        <div id="imageName${i}-${j}">
          <p>${initials}</p>
        </div>
      </div>`;
    document.getElementById(`nameDone${i}-${j}`).style.backgroundColor =
      getColorByIndex(j);
  }
}

/**
 * Loads subtasks details into the task details view.
 * @param {Object} task - The task object containing subtasks information.
 */
function loadSubtasksDetails(task) {
  let assignedToContainer = document.getElementById("assignedToContainer");
  assignedToContainer.innerHTML = "";
  for (let i = 0; i < task.assignedto.length; i++) {
    let name = task.assignedto[i];
    let initials = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
    assignedToContainer.innerHTML += `
        <div class="profile-name-assign">
        <div id="imageProfil${i}" class="circle">
        ${initials}
        </div>
        <p>${task.assignedto[i]}</p>
        </div>
        `;
    document.getElementById(`imageProfil${i}`).style.backgroundColor =
      getColorByIndex(i);
  }
}

/**
 * Loads and updates the subtasks into the task details view.
 * @param {Object} task - The task object containing subtasks information.
 * @param {number} i - The index of the task in the array.
 */
function loadSubtaksDetailsToTemplates(task, i) {
  let detailsSubtasks = document.getElementById("detailsSubtasks");
  detailsSubtasks.innerHTML = "";

  // Sicherstellen, dass task.subtask ein gültiges Array ist
  if (!task.subtask || !Array.isArray(task.subtask)) {
    detailsSubtasks.innerHTML = `<p>No Subtasks</p>`;
    setProgressBar(task.titel, 0, 0);
    return;
  }

  // Filtern von gültigen Subtasks
  task.subtask = task.subtask.filter(
    (subtask) => subtask && subtask.name && subtask.name.trim() !== ""
  );

  if (task.subtask.length === 0) {
    detailsSubtasks.innerHTML = `<p>No Subtasks</p>`;
    setProgressBar(task.titel, 0, 0);
    return;
  }

  // Rendern der Subtasks
  task.subtask.forEach((subtask, index) => {
    detailsSubtasks.innerHTML += `
       <div class="subtasks-details">
         <p>${subtask.name}</p>
          <div class="checkbox-container">
           <input class="checkbox cursor-pointer" type="checkbox" id="subtask-checkbox-${index}" onclick="toggleSubtaskStatus('${
      task.titel
    }', ${index})" ${subtask.completed ? "checked" : ""}>
          </div>
       </div>
    `;
  });
  updateProgress(task.titel);
}
