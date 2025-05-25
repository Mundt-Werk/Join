/**
 * Loads tasks from the data source, initializes the add task functionality, and renders the tasks on the board.
 */
async function loadTasksToBoard() {
  await loadData(); 
  await initAddTask(); 
  renderTasks();
}

/**
 * Filters tasks into categories (To-do, In Progress, Awaiting Feedback, Done) and renders them in their respective sections.
 */
function renderTasks() {
  todo = tasks.filter((t) => t["status"] == "To-do");
  inProgress = tasks.filter((t) => t["status"] == "In progress");
  awaitingFeedback = tasks.filter((t) => t["status"] == "Awaiting feedback");
  done = tasks.filter((t) => t["status"] == "Done");
  renderTodo(todo);
  renderInProgress(inProgress);
  renderAwaitingFeedback(awaitingFeedback);
  renderDone(done);
}

/**
 * Renders tasks in the 'To-do' section.
 * @param {Array} todo - Array of tasks with the status 'To-do'.
 */
function renderTodo(todo) {
  if (todo == 0) {
    displayEmptyMessageTodo(); 
  } else {
    let toDoTasks = document.getElementById("toDoTasks");
    toDoTasks.innerHTML = "";
    for (let i = 0; i < todo.length; i++) {
      toDoTasks.innerHTML += getTodoTemplates(todo[i], "todo", i); 
      getTodoAssignedName(todo[i], i); 
      checkUpdateProgress(todo, i, "todo"); 
    }
  }
}

/**
 * Renders tasks in the 'In Progress' section.
 * @param {Array} inProgress - Array of tasks with the status 'In progress'.
 */
function renderInProgress(inProgress) {
  if (inProgress == 0) {
    displayEmptyMessageInProgress();
  } else {
    let inProgressTasks = document.getElementById("inProgressTasks");
    inProgressTasks.innerHTML = "";
    for (let i = 0; i < inProgress.length; i++) {
      inProgressTasks.innerHTML += getInProgressTemplates(
        inProgress[i],
        "inProgress",
        i
      );
      getInProgressAssignedName(inProgress[i], i);
      checkUpdateProgress(inProgress, i, "inProgress");
    }
  }
}

/**
 * Renders tasks in the 'Awaiting Feedback' section.
 * @param {Array} awaitingFeedback - Array of tasks with the status 'Awaiting feedback'.
 */
function renderAwaitingFeedback(awaitingFeedback) {
  if (awaitingFeedback == 0) {
    displayEmptyMessageAwaitingFeedback();
  } else {
    let awaitingFeedbackTasks = document.getElementById(
      "awaitingFeedbackTasks"
    );
    awaitingFeedbackTasks.innerHTML = "";
    for (let i = 0; i < awaitingFeedback.length; i++) {
      awaitingFeedbackTasks.innerHTML += getAwaitingFeedbackTemplates(
        awaitingFeedback[i],
        "awaitingFeedback",
        i
      );
      getAwaitingFeedbackAssignedName(awaitingFeedback[i], i);
      checkUpdateProgress(awaitingFeedback, i, "awaitingFeedback");
    }
  }
}

/**
 * Renders tasks in the 'Done' section.
 * @param {Array} done - Array of tasks with the status 'Done'.
 */
function renderDone(done) {
  if (done.length == 0) {
    displayEmptyMessageDone();
  } else {
    let doneTasks = document.getElementById("doneTasks");
    doneTasks.innerHTML = "";
    for (let i = 0; i < done.length; i++) {
      doneTasks.innerHTML += getDoneTemplates(done[i], "done", i);
      getDoneAssignedName(done[i], i);
      checkUpdateProgress(done, i, "done");
    }
  }
}

/**
 * Displays an empty message in the 'To-do' section if there are no tasks.
 */
function displayEmptyMessageTodo() {
  document.getElementById("toDoTasks").innerHTML =
    '<div class="task-container"><p>No tasks Todo</p></div>';
}

/**
 * Displays an empty message in the 'In Progress' section if there are no tasks.
 */
function displayEmptyMessageInProgress() {
  document.getElementById("inProgressTasks").innerHTML =
    '<div class="task-container"><p>No tasks In Progress</p></div>';
}

/**
 * Displays an empty message in the 'Awaiting Feedback' section if there are no tasks.
 */
function displayEmptyMessageAwaitingFeedback() {
  document.getElementById("awaitingFeedbackTasks").innerHTML =
    '<div class="task-container"><p>No tasks Awaiting Feedback</p></div>';
}

/**
 * Displays an empty message in the 'Done' section if there are no tasks.
 */
function displayEmptyMessageDone() {
  document.getElementById("doneTasks").innerHTML =
    '<div class="task-container"><p>No tasks Done</p></div>';
}

/**
 * Opens the overlay for a specific task, displaying its details and subtasks.
 * @param {string} arrayName - The name of the array containing the task (e.g., 'todo').
 * @param {number} i - The index of the task in the array.
 */
function openTaskOverlay(arrayName, i) {
  let task = checkwhichArray(arrayName, i);
  let overlay = document.getElementById("taskoverlaycontainer");
  overlay.classList.remove("d-none");
  overlay.classList.add("active");
  getDetailsTemplates(task, i, arrayName);
  loadSubtasksDetails(task);
  loadSubtaksDetailsToTemplates(task, i);
  document.body.style.overflow = "hidden";
}

/**
 * Fills the task overlay with details about the task's category.
 * @param {Object} task - The task object.
 * @param {HTMLElement} overlay - The overlay element.
 */
function fillOverlayTaskDetails(task, overlay) {
  overlay.querySelector(".category p").textContent = task.category; 
}

/**
 * Fills the subtasks container with the list of subtasks for a given task.
 * @param {Object} task - The task object containing subtasks.
 * @param {HTMLElement} subtasksContainer - The container element for subtasks.
 */
function fillSubtasks(task, subtasksContainer) {
  subtasksContainer.innerHTML = ""; 
  task.subtask.forEach((subtask) => {
    const subtaskElement = document.createElement("p"); 
    subtaskElement.textContent = subtask; 
    subtasksContainer.appendChild(subtaskElement); 
  });
}

/**
 * Closes the task overlay and restores the page's scroll functionality.
 */
function closeTaskOverlay() {
  const overlay = document.querySelector(".task-overlay-container");
  overlay.classList.add("d-none");
  document.body.style.overflow = "auto"; 
}

let deleteTaskParams = {}; 

/**
 * Opens the delete confirmation modal for a specific task.
 * @param {number} i - The index of the task in the array.
 * @param {string} arrayName - The name of the array containing the task (e.g., 'todo').
 */
function openDeleteConfirmationModal(i, arrayName) {
  deleteTaskParams = { i, arrayName }; 
  const confirmationModal = document.getElementById("confirmation-modal");
  confirmationModal.classList.remove("hidden"); 
}

/**
 * Confirms the deletion of a task and reloads the tasks on the board.
 */
function confirmDeleteTask() {
  const { i, arrayName } = deleteTaskParams; 
  deleteTasks(i, arrayName).then(() => {
    loadTasksToBoard(); 
  });
  closeConfirmationModal(); 
  clearInputs();
}

/**
 * Closes the delete confirmation modal and resets the delete parameters.
 */
function closeConfirmationModal() {
  const confirmationModal = document.getElementById("confirmation-modal");
  confirmationModal.classList.add("hidden"); 
  deleteTaskParams = {}; 
}

/**
 * Deletes a task from the specified array and updates the tasks in the API.
 * @param {number} i - The index of the task in the array.
 * @param {string} arrayName - The name of the array containing the task.
 */
async function deleteTasks(i, arrayName) {
  let taskArray = checkwhichDeleteArray(arrayName, i); 
  let taskIndex = tasks.findIndex((task) => task.titel === taskArray[i].titel); 
  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1); 
    await deleteData();
  }
  taskArray.splice(i, 1); 
  await startTasksToAPI(tasks); 
  closeTaskOverlay(); 
  await loadTasksToBoard(); 
}

/**
 * Filters tasks based on a search term and updates the visibility of tasks on the board.
 */
function filterTasks() {
  const searchTermSmall = document.getElementById("name").value.toLowerCase();
  const searchTermBig = document.getElementById("name-big").value.toLowerCase();
  const searchTerm = searchTermSmall || searchTermBig; 

  const tasks = document.querySelectorAll(".task"); 

  tasks.forEach((task) => {
    const titleElement = task.querySelector(".task-title");
    const descriptionElement = task.querySelector(".task-desc");

    const title = titleElement ? titleElement.textContent.toLowerCase() : "";
    const description = descriptionElement
      ? descriptionElement.textContent.toLowerCase()
      : "";

    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      task.style.display = ""; 
    } else {
      task.style.display = "none"; 
    }
  });

  const noResultsMessage = document.getElementById("noResultsMessage");
  const visibleTasks = Array.from(tasks).some(
    (task) => task.style.display === "" 
  );
  noResultsMessage.style.display = visibleTasks ? "none" : "block"; 
}

/**
 * Clears the input fields used for filtering tasks.
 */
function clearInputs() {
  document.getElementById('name').value = '';
  document.getElementById('name-big').value = '';
}
