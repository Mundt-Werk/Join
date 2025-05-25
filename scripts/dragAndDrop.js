let currentDraggedTask = null;

/**
 * Initializes the dragging process by setting the currently dragged task.
 * @param {string} arrayName - The name of the array where the task resides.
 * @param {number} id - The ID of the task being dragged.
 */
function startDragging(arrayName, id) {
  currentDraggedTask = checkwhichArray(arrayName, id);
}

/**
 * Enables an element to accept dropped items.
 * @param {DragEvent} event - The drag event to prevent its default behavior.
 */
function allowDrop(event) {
  event.preventDefault();
}

/**
 * Moves the currently dragged task to a new status category.
 * @param {string} status - The new status to assign to the task.
 */
function moveTo(status) {
  if (currentDraggedTask === null) return;

  let task = currentDraggedTask;
  task.status = status;

  saveTasks();
  updateHTML();
  removeAllHighlights();

  currentDraggedTask = null;
}

/**
 * Updates the HTML content of all task containers and re-renders the tasks.
 */
function updateHTML() {
  let toDoContainer = document.getElementById("toDoTasks");
  let inProgressContainer = document.getElementById("inProgressTasks");
  let awaitingFeedbackContainer = document.getElementById(
    "awaitingFeedbackTasks"
  );
  let doneContainer = document.getElementById("doneTasks");

  toDoContainer.innerHTML = "<h2>To Do</h2>";
  inProgressContainer.innerHTML = "<h2>In Progress</h2>";
  awaitingFeedbackContainer.innerHTML = "<h2>Awaiting Feedback</h2>";
  doneContainer.innerHTML = "<h2>Done</h2>";

  renderTasks();
}

/**
 * Adds a highlight effect to the drop zone.
 * @param {string} id - The ID of the drop zone element to highlight.
 */
function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
}

/**
 * Removes the highlight effect from the drop zone.
 * @param {string} id - The ID of the drop zone element to remove the highlight from.
 */
function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}

/**
 * Removes the highlight effect from all drop zones.
 */
function removeAllHighlights() {
  const dropZones = [
    "toDoTasks",
    "inProgressTasks",
    "awaitingFeedbackTasks",
    "doneTasks",
  ];
  dropZones.forEach((zone) =>
    document.getElementById(zone).classList.remove("drag-area-highlight")
  );
}

/**
 * Moves a task to the next status category.
 * @param {string} currentStatus - The current status of the task.
 * @param {number} taskId - The ID of the task to move.
 */
function switchTaskDown(currentStatus, taskId){
  let statusMap = {
    "To-do": "In progress",
    "In progress": "Awaiting feedback",
    "Awaiting feedback": "Done",
    "Done": null
  };

  let newStatus = statusMap[currentStatus];
  if (!newStatus) return;

  let taskIndex = tasks.findIndex(task => task.id == taskId);
  if (taskIndex === -1) {
    return;
  }

  tasks[taskIndex].status = newStatus;
  saveTasks();
  updateHTML();
}

/**
 * Moves a task to the previous status category.
 * @param {string} currentStatus - The current status of the task.
 * @param {number} taskId - The ID of the task to move.
 */
function switchTaskUp(currentStatus, taskId){
  let statusMap = {
    "Done": "Awaiting feedback",
    "Awaiting feedback":"In progress",
    "In progress": "To-do",
    "To-do": null 
  };

  let newStatus = statusMap[currentStatus];
  if (!newStatus) return;

  let taskIndex = tasks.findIndex(task => task.id == taskId);
  if (taskIndex === -1) {
    return;
  }

  tasks[taskIndex].status = newStatus;
  saveTasks();
  updateHTML();
}
