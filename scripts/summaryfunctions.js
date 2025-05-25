let userlogin = true; 
let statusCount = {
  "To-do": 0,
  "Done": 0,
  "In progress": 0,
  "Awaiting feedback": 0,
  "Urgent": 0,
}; 

/**
 * Initializes the summary by loading user data and tasks, and setting up greetings.
 */
async function initsummary() {
  await loadUserAPI(); 
  await loadData(); 
  
  const currentTime = new Date().getHours();
  checkIncomingHtml(currentTime);
}

/**
 * Checks the referrer HTML to determine the context and applies the necessary setup for greetings and tasks.
 * @param {number} localtime - The current local time in hours.
 */
function checkIncomingHtml(localtime) {
  const referrer = document.referrer; 

  if (referrer.includes("index.html")) {
    getNumberOfTasks();
    setTimeout(() => {
      getGreetingNameAndTime(localtime); 
      getSummaryGreeting(localtime); 
    }, 100); 
  } else {
    getNumberOfTasks();
    addedDisplayNone();
    getSummaryGreeting(localtime);
  }
}

/**
 * Displays a greeting message with the user's name and fades out the initial hello container.
 * @param {number} localtime - The current local time in hours.
 */
function getGreetingNameAndTime(localtime) {
  const greetingTimeElement = document.getElementById("greeting-time");
  const greetingMessage = checkGreetingMessage(localtime);
  const userName = checkUserNameMain(); 
  
  greetingTimeElement.innerHTML = `<p>${greetingMessage}</p> <h2>${userName}</h2>`;  
  setTimeout(() => {
    fadeOutHelloContainer(); 
  }, 2000);
}

/**
 * Displays the summary greeting message in the main menu.
 * @param {number} localtime - The current local time in hours.
 */
function getSummaryGreeting(localtime) {
  const greetingElement = document.getElementById("greeting-time-main-menu");
  const greetingMessage = checkGreetingMessage(localtime); 
  const userName = checkUserNameMain(); 
  greetingElement.innerHTML = `<p>${greetingMessage}</p> <h2>${userName}</h2>`; 
}

/**
 * Determines the appropriate greeting message based on the current local time.
 * @param {number} localtime - The current local time in hours.
 * @returns {string} The greeting message.
 */
function checkGreetingMessage(localtime) {
  let greeting;
  if (localtime >= 5 && localtime < 12) {
    greeting = "Good morning";
  } else if (localtime >= 12 && localtime < 18) {
    greeting = "Good day";
  } else {
    greeting = "Good evening";
  }
  return userlogin ? greeting + "" : greeting + "!"; 
}

/**
 * Updates the greeting name based on the user's login status.
 */
function checkUserLogin() {
  let greetingname = document.getElementById("greeting-name");
  greetingname.innerHTML = "";
  greetingname.innerHTML = checkUserName();
}

/**
 * Updates the main menu greeting name based on the user's login status.
 */
function checkUserLoginMain() {
  let greetingtimemainmenu = document.getElementById("greeting-name-main-menu");
  greetingtimemainmenu.innerHTML = "";
  greetingtimemainmenu.innerHTML = checkUserNameMain();
}

/**
 * Retrieves the logged-in user's name or defaults to "Team Join."
 * @returns {string} The user's name or a default value.
 */
function checkUserNameMain() {
  const loggedInName = localStorage.getItem("loggedInName"); 
  return loggedInName ? loggedInName : "Team Join"; 
}

/**
 * Checks the user's login status and returns the appropriate name.
 * @returns {string} The user's name or an empty string.
 */
function checkUserName() {
  if (userlogin) {
    return "Team Join";
  } else {
    document.getElementById("greeting-time").innerHTML = "";
    return "";
  }
}

/**
 * Fades out the hello container and toggles the visibility of the overview section.
 */
function fadeOutHelloContainer() {
  document.getElementById("hello-container").classList.add("fade-out"); 
  setTimeout(() => {
    document.getElementById("hello-container").classList.add("d-none"); 
    document.getElementById("headline-overview").classList.toggle("d-none"); 
    document.getElementById("overview").classList.toggle("d-none"); 
  }, 1000);
}

/**
 * Hides the hello container and toggles the visibility of the overview section.
 */
function addedDisplayNone() {
  document.getElementById("hello-container").style.display = "none";
  document.getElementById("headline-overview").classList.toggle("d-none");
  document.getElementById("overview").classList.toggle("d-none");
}

/**
 * Counts the number of tasks for each status and triggers updates to display the task numbers.
 */
function getNumberOfTasks() {
  tasks.forEach((task) => {
    let status = task.status;
    if (statusCount[status] !== undefined) {
      statusCount[status]++; 
    }
  });
  getUrgentNumberOfTasks(); 
  showNumberOfTasks(statusCount); 
}

/**
 * Counts the number of tasks with an "Urgent" priority.
 */
function getUrgentNumberOfTasks() {
  tasks.forEach((task) => {
    let priority = task.priority;
    if (statusCount[priority] !== undefined) {
      statusCount[priority]++; 
    }
  });
}

/**
 * Updates the overview section to display the number of tasks for each status.
 * @param {Object} statusCount - An object containing the count of tasks by status.
 */
function showNumberOfTasks(statusCount) {
  overview = document.getElementById("overview");
  overview.innerHTML = "";
  overview.innerHTML = getTemplatesNumberOfTasks(statusCount); 
}
