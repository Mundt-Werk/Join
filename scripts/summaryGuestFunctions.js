let userlogin = false; 
let statusCount = {
  "To-do": 0,
  "Done": 0,
  "In progress": 0,
  "Awaiting feedback": 0,
  "Urgent": 0,
}; 

/**
 * Initializes the summary by loading task data and checking the incoming HTML.
 */
async function initsummary() {
  await loadData();
  let newtime = new Date();
  let localtime = newtime.getHours(); 
  checkIncomingHtml(localtime); 
}

/**
 * Checks the referrer HTML and determines whether to display tasks and greetings.
 * @param {number} localtime - The current local time in hours.
 */
function checkIncomingHtml(localtime) {
  let htmlUrl = document.referrer; 
  if (htmlUrl.includes("index.html")) {
    getNumberOfTasks(); 
    getGreetingNameAndTime(localtime);
    getSummaryGreeting(localtime); 
  } else {
    getNumberOfTasks();
    addedDisplayNone(); 
    getSummaryGreeting(localtime);
  }
}

/**
 * Updates the greeting message with the user's name and time-based greeting.
 * @param {number} localtime - The current local time in hours.
 */
function getGreetingNameAndTime(localtime) {
  let greetingtime = document.getElementById("greeting-time");
  greetingtime.innerHTML = ""; 
  checkUserLogin(); 
  greetingtime.innerHTML = checkGreetingMessage(localtime); 

  setTimeout(() => {
    fadeOutHelloContainer(); 
  }, 500);
}

/**
 * Displays the summary greeting in the main menu based on the local time.
 * @param {number} localtime - The current local time in hours.
 */
function getSummaryGreeting(localtime) {
  let greetingtimemainmenu = document.getElementById("greeting-time-main-menu");
  greetingtimemainmenu.innerHTML = ""; 
  checkUserLoginMain(); 
  greetingtimemainmenu.innerHTML = checkGreetingMessage(localtime);
}

/**
 * Determines the appropriate greeting message based on the local time.
 * @param {number} localtime - The current local time in hours.
 * @returns {string} The greeting message.
 */
function checkGreetingMessage(localtime) {
  let greeting;
  if (localtime >= 5 && localtime < 12) {
    greeting = "Good <h2>Morning</h2>";
  } else if (localtime >= 12 && localtime < 18) {
    greeting = "Good <h2>Day</h2>";
  } else {
    greeting = "Good <h2>Evening</h2>";
  }
  return userlogin ? greeting + "," : greeting + ""; 
}

/**
 * Updates the greeting name in the header based on the user's login status.
 */
function checkUserLogin() {
  let greetingname = document.getElementById("greeting-name");
  greetingname.innerHTML = ""; 
  greetingname.innerHTML = checkUserName(); 
}

/**
 * Updates the greeting name in the main menu based on the user's login status.
 */
function checkUserLoginMain() {
  let greetingtimemainmenu = document.getElementById("greeting-name-main-menu");
  greetingtimemainmenu.innerHTML = ""; 
  greetingtimemainmenu.innerHTML = checkUserNameMain(); 
}

/**
 * Retrieves the logged-in user's name for the main menu or returns an empty string.
 * @returns {string} The user's name or an empty string if not logged in.
 */
function checkUserNameMain() {
  if (userlogin) {
    return "Sofia Müller";
  } else {
    document.getElementById("greeting-name-main-menu").innerHTML = ""; 
    return "";
  }
}

/**
 * Retrieves the logged-in user's name for the header or returns an empty string.
 * @returns {string} The user's name or an empty string if not logged in.
 */
function checkUserName() {
  if (userlogin) {
    return "Sofia Müller";
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
 * Calculates the number of tasks for each status and updates the task overview.
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
 * Calculates the number of tasks marked as "Urgent."
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
 * Displays the number of tasks for each status in the overview.
 * @param {Object} statusCount - An object containing task counts by status.
 */
function showNumberOfTasks(statusCount) {
  overview = document.getElementById("overview");
  overview.innerHTML = ""; 
  overview.innerHTML = getTemplatesNumberOfTasks(statusCount); 
}
