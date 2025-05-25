/**
 * Loads tasks from the API and pushes them into the local tasks array.
 */
async function loadData() {
  let tasksAPI = await loadTasksFromAPI();
  await pushToTasksFromAPI(tasksAPI);
}

/**
 * Sends the provided tasks to the API for storage.
 * @param {Array} tasks - Array of task objects to be stored.
 */
async function startTasksToAPI(tasks) {
  putTasksToAPI(tasks);
}

/**
 * Saves the current tasks to the API.
 */
function saveTasks() {
  putTasksToAPI(tasks);
}

/**
 * Processes and pushes tasks from the API response to the local tasks array.
 * @param {Object} tasksAPI - API response containing tasks.
 */
async function pushToTasksFromAPI(tasksAPI) {
  for (const key in tasksAPI) {
    const task = tasksAPI[key];
    tasks.push({
      titel: task.titel || "Kein Titel",
      description: task.description || "Keine Beschreibung",
      assignedto: task.assignedto || [],
      date: task.date || "Kein Datum",
      priority: task.priority || "low",
      category: task.category || "Unkategorisiert",
      subtask: task.subtask || [],
      status: task.status || "To-do",
    });
  }
}

/**
 * Loads tasks from local storage and assigns them to the tasks array.
 * @returns {Array} The tasks loaded from local storage.
 */
async function loadTasksData() {
  let storagetasks = JSON.parse(localStorage.getItem("Tasks"));
  tasks = storagetasks;
  return tasks;
}

/**
 * Fetches tasks from the API and processes them into the local tasks array.
 */
async function loadTasksFromAPI() {
  let response = await fetch(BASE_URL + "tasks.json");
  let tasksFromFirebase = await response.json();

  tasks = [];
  for (const key in tasksFromFirebase) {
    const task = tasksFromFirebase[key];
    tasks.push({
      id: key,
      titel: task.titel || "Kein Titel",
      description: task.description || "Keine Beschreibung",
      assignedto: task.assignedto || [],
      date: task.date || "Kein Datum",
      priority: task.priority || "low",
      category: task.category || "Unkategorisiert",
      subtask: task.subtask || [],
      status: task.status || "To-do",
    });
  }
}

/**
 * Sends tasks to the API using a PUT request.
 * @param {Object} data - The tasks to be sent to the API.
 */
async function putTasksToAPI(data = {}) {
  let response = await fetch(BASE_URL + "tasks" + ".json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  await response.json();
}

async function pushToTasksFromAPI(tasksAPI) {
  for (const key in tasksAPI) {
    const task = tasksAPI[key];
    tasks.push({
      titel: task.titel || "Kein Titel",
      description: task.description || "Keine Beschreibung",
      assignedto: task.assignedto || [],
      date: task.date || "Kein Datum",
      priority: task.priority || "low",
      category: task.category || "Unkategorisiert",
      subtask: (task.subtask || []).map((st) => ({
        name: st.name || "", 
        completed: st.completed || false,
      })),
      status: task.status || "To-do",
    });
  }
}

/**
 * Deletes all tasks from the API.
 * @returns {Object} The API response after deletion.
 */
async function deleteData() {
  let response = await fetch(BASE_URL + "tasks" + ".json", {
    method: "DELETE",
  });
  return (responseToJson = await response.json());
}

/**
 * Returns the task from the specified array by its index.
 * @param {string} arrayName - Name of the array (e.g., "todo", "inProgress").
 * @param {number} i - Index of the task in the array.
 * @returns {Object} The task at the specified index.
 */
function checkwhichArray(arrayName, i) {
  switch (arrayName) {
    case "todo":
      return todo[i];
    case "inProgress":
      return inProgress[i];
    case "awaitingFeedback":
      return awaitingFeedback[i];
    case "done":
      return done[i];
  }
}

/**
 * Returns a color from a predefined list based on the given index.
 * @param {number} index - Index to determine the color.
 * @returns {string} Hex color code.
 */
function getColorByIndex(index) {
  const colors = [
    "#FF7A00",
    "#9327FF",
    "#6E52FF",
    "#FC71FF",
    "#FFBB2B",
    "#1FD7C1",
    "#FF4646",
  ];
  return colors[index % colors.length];
}

/**
 * Generates initials from a given name.
 * @param {string} name - Full name of a person.
 * @returns {string} The initials in uppercase.
 */
function getInitials(name) {
  let nameSplit = name.trim().split(" ");
  let initials = nameSplit[0][0] + (nameSplit[1] ? nameSplit[1][0] : "");
  return initials.toUpperCase();
}

function checkwhichDeleteArray(arrayName) {
  switch (arrayName) {
    case "todo":
      return todo;
    case "inProgress":
      return inProgress;
    case "awaitingFeedback":
      return awaitingFeedback;
    case "done":
      return done;
  }
}

/**
 * Fetches contacts from Firebase and maps them into the local contacts array.
 * @param {string} [path="contacts"] - The Firebase path to load contacts from.
 */
async function loadContactsFromFirebase(path = "contacts") {
  try {
    let response = await fetch(`${BASE_URL}${path}.json`);
    let loadedContacts = await response.json();

    if (loadedContacts) {
      contacts = Object.keys(loadedContacts).map((nameKey) => {
        let contact = loadedContacts[nameKey];
        return {
          id: nameKey,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
        };
      });
    }
  } catch (error) {
  }
}

function checkSubtask(task, i) {
  if (!task.subtask || !Array.isArray(task.subtask)) return 0;

  let hasValidSubtasks = task.subtask.some(
    (subtask) => subtask && subtask.name && subtask.name.trim() !== ""
  );

  return hasValidSubtasks ? task.subtask.length : 0;
}

/**
 * Toggles the completion status of a specific subtask within a task.
 * @param {string} taskTitle - Title of the task.
 * @param {number} subtaskIndex - Index of the subtask to toggle.
 */
function toggleSubtaskStatus(taskTitle, subtaskIndex) {
  let task = tasks.find((t) => t.titel === taskTitle);
  if (!task) return;

  task.subtask[subtaskIndex].completed = !task.subtask[subtaskIndex].completed;

  saveTasks(); 
  updateProgress(taskTitle); 
}

function checkUpdateProgress(task, i, arrayName) {
  if (!task[i] || !task[i].subtask || !Array.isArray(task[i].subtask)) return;

  let totalSubtasks = task[i].subtask.filter(
    (subtask) => subtask && subtask.name && subtask.name.trim() !== ""
  ).length;

  let completedSubtasks = task[i].subtask.filter(
    (subtask) => subtask && subtask.completed && subtask.name.trim() !== ""
  ).length;

  if (totalSubtasks > 0) {
    document
      .getElementById(`progressContainer-${arrayName}-${i}`)
      .classList.remove("d-none");
  }

  document.getElementById(
    `subtask-progress-${task[i].titel}`
  ).textContent = `${completedSubtasks}/${totalSubtasks} Subtasks`;

  setProgressBar(task[i].titel, completedSubtasks, totalSubtasks);
}

function updateProgress(taskTitle, i) {
  let task = tasks.find((t) => t.titel === taskTitle);
  if (!task) return;

  let totalSubtasks = task.subtask.length;
  let completedSubtasks = task.subtask.filter((s) => s.completed).length;
  if (totalSubtasks == 0) {
    document.getElementById(`progressContainer${i}`).classList.add("d-none");
  } else {
    document.getElementById(
      `subtask-progress-${taskTitle}`
    ).textContent = `${completedSubtasks}/${totalSubtasks} Subtasks`;
    setProgressBar(taskTitle, completedSubtasks, totalSubtasks); 
  }
}

/**
 * Updates the progress bar for a specific task based on completed subtasks.
 * @param {string} taskTitle - Title of the task.
 * @param {number} completed - Number of completed subtasks.
 * @param {number} total - Total number of subtasks.
 */
function setProgressBar(taskTitle, completed, total) {
  let progressPercent = (completed / total) * 100;
  let progressBarContainer = document.getElementById(
    `progress-bar-${taskTitle}`
  );

  if (progressBarContainer) {
    progressBarContainer.querySelector(
      ".progressbar-fill"
    ).style.width = `${progressPercent}%`;
  }
}

function handleContactSelection(event, arrayName, taskIndex, contactId, index) {
  const checkbox = document.getElementById(`contact-checkbox-${index}`);
  if (event.target.tagName.toLowerCase() === "input") {
    return;}
  checkbox.checked = !checkbox.checked;
  toggleContactSelection(arrayName, taskIndex, contactId);
}

/**
 * Sets the minimum date for the edit date input to today's date.
 */
function setMinimumDateForEdit(){
  let today = new Date().toISOString().split("T")[0];
  document.getElementById("editDate").setAttribute("min", today);
}
