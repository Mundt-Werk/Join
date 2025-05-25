let inputTitle;
let inputDate;
let inputCategory;
let inputSubtask = "";

/**
 * Initializes the "Add Task" process.
 * Loads contacts from Firebase and populates the list with the loaded contacts.
 * @async
 * @returns {Promise<void>} - A promise that waits for the contacts to be fully loaded.
 */
async function initAddTask() {
  await loadData();
  loadContactsInList();
}

/**
 * Resets the priority markers and classes for all priority buttons.
 * Removes specific CSS classes from the buttons that visually indicate priority.
 * @returns {void}
 */
async function loadData() {
  
  let tasksAPI = await loadTasksFromAPI();

  
  await pushToTasksFromAPI(tasksAPI);

  
  await loadContactsFromFirebase();
}

/**
 * Sets the priority for a task and updates its visual representation.
 * The function first removes all active priority markers and
 * then applies the appropriate classes to the button corresponding to the given priority.
 * @param {string} priority - The priority to set ("urgent", "medium", "low").
 * @returns {void}
 */
function resetButtons() {
  document.getElementById("btn1").classList.remove("priority-marked-urgent");
  document.getElementById("btn2").classList.remove("priority-marked-medium");
  document.getElementById("btn3").classList.remove("priority-marked-low");
}

/**
 * Clears the contents of all input fields and containers in the "Create Task" form.
 * This function is used to reset the form after creating or canceling a task.
 * @returns {void}
 */
function setPriority(priority) {
  
  resetButtons();
  document.querySelectorAll(".priority-button").forEach((btn) => {
    btn.classList.remove("active");
  });

  
  if (priority === "urgent") {
    document.getElementById("btn1").classList.add("priority-marked-urgent");
    document.getElementById("btn1").classList.add("active");
  } else if (priority === "medium") {
    document.getElementById("btn2").classList.add("priority-marked-medium");
    document.getElementById("btn2").classList.add("active");
  } else if (priority === "low") {
    document.getElementById("btn3").classList.add("priority-marked-low");
    document.getElementById("btn3").classList.add("active");
  }
}
/**
 * Opens the modal for adding a new task and sets the current status.
 * The function displays the overlay and visually activates it with an animation.
 * @param {string} [status='To-do'] - The status to assign to the new task 
 * (e.g., "To-do", "In Progress", "Done").
 * @returns {void}
 */
function clearTask() {
  document.getElementById("task_title_input").value = "";
  document.getElementById("task_description_input").value = "";
  document.getElementById("contact_dropdown").innerHTML = "";
  document.getElementById("assigned_contacts_container").innerHTML = "";
  document.getElementById("selected_category_desktop").textContent = "Select category"
  document.getElementById("subtask_list_desktop").innerHTML = "";
  // Optional: Kommentare für zusätzliche Felder können aktiviert werden
  // document.getElementById('clear-due-date').value = '';
  // document.getElementById('clear-subtask').value = '';
}

/**
 * Creates a new task based on the user's input in the form.
 * The function validates the required fields, collects the data from the input fields,
 * and sends the task to an API for storage. 
 * Afterward, a success message is displayed, and the user is redirected to the board.
 * @async
 * @param {Event} event - The event object of the form submission event, 
 * used to prevent the default behavior.
 * @returns {Promise<void>} - A promise that resolves after the API request and redirection are completed.
 */

async function createTask(event, hasErrors) {
  event.preventDefault();

  if (!hasErrors) { 
    let title = document.getElementById("task_title_input").value;
    let description = document.getElementById("task_description_input").value;
    let dueDate = document.getElementById("task_due_date_desktop").value;
    let category = document
      .getElementById("selected_category_desktop")
      .textContent.trim();
    let priority = document
      .querySelector(".priority-button.active")
      .textContent.trim();
    let subtasks = inputSubtask;
    let assignedto = getSelectedContacts();
    
    await uploadTasksToAPI(title, description, dueDate, category, priority, subtasks, assignedto);
    await showSuccessMessage(3000);
    window.location.href = "/projects/join/htmls/board.html";
  }
}


function setupTitleInput() {
  let titleInput = document.getElementById("task_title_input");
  titleInput?.addEventListener("keyup", () => {
    checkInputs();
  });
}

function setupDateInput() {
  let dateInput = document.getElementById("task_due_date_desktop");
  dateInput?.addEventListener("change", () => {
    checkInputs();
  });
}

function checkValidation(event){
  
  let hasErrors = validateRequiredFields();
  if (!inputTitle || !inputDate || !inputCategory) {
    checkAddTaskButton(hasErrors);
  } else {
    createTask(event, hasErrors);
  }
}

function checkInputTitlel(){
  border = document.getElementById("task_title_input");
  let titleInput = document.getElementById("task_title_input").value
  inputTitle = titleInput;
  if (inputTitle) {
    document.getElementById("checkTaskButton").classList.remove("disable");
    document.getElementById("task_title_error").classList.add("d-none");
    checkTaskButton.disabled = false;
    border.style.border = ""; 
  }
}

function checkDate(){
  border = document.getElementById("task_due_date_desktop");
  let dueDate = document.getElementById("task_due_date_desktop");
  let currentDate = dueDate.value;
  inputDate = currentDate;
  if (inputDate) {
    document.getElementById("checkTaskButton").classList.remove("disable");
    document.getElementById("due_date_error").classList.add("d-none");
    checkTaskButton.disabled = false;
    border.style.border = ""; 
  }
}

function checkCategory(selectedCategory){
  border = document.getElementById("category_dropdown_trigger_desktop");
  let category = selectedCategory
  inputCategory = category;
  if (inputCategory) {
    document.getElementById("checkTaskButton").classList.remove("disable");
    document.getElementById("category_error").classList.add("d-none");
    checkTaskButton.disabled = false;
    border.style.border = ""; 
  }
}

function checkAddTaskButton(hasErrors){
  if (hasErrors = true) {
    let checkTaskButton = document.getElementById("checkTaskButton");
    checkTaskButton.classList.add("disable");
    checkTaskButton.disabled = true;
  } else {
    let checkTaskButton = document.getElementById("checkTaskButton");
    checkTaskButton.classList.remove("disable");
    checkTaskButton.disabled = false;
  }
}

/**
 * Sends the information of a new task to the API for storage.
 * The function creates a task object using the provided parameters, adds it 
 * to the global task list, and sends the updated list to the API.
 * @async
 * @param {string} title - The title of the task.
 * @param {string} description - A description of the task.
 * @param {string} dueDate - The due date of the task in YYYY-MM-DD format.
 * @param {string} category - The category of the task (e.g., "Technical Tasks" or "User Story").
 * @param {string} priority - The priority of the task (e.g., "urgent", "medium", "low").
 * @param {string} subtasks - The name of the subtask (default is not completed).
 * @param {string} status - The status of the task (e.g., "To-do", "In Progress", "Done").
 * @param {Array<string>} assignedto - A list of full names of the people assigned to the task.
 * @returns {Promise<void>} - A promise that resolves after the API storage is completed.
 */
async function uploadTasksToAPI(
  title,
  description,
  dueDate,
  category,
  priority,
  subtasks,
  assignedto
) {
  let task = {
    titel: title, 
    description: description, 
    assignedto: assignedto, 
    date: dueDate, 
    priority: priority, 
    category: category, 
    subtask: [
      { "name": subtasks, "completed": false } 
    ],
    status: "To-do", 
  };
  tasks.push(task);
  await startTasksToAPI(tasks);
}
/**
 * Initializes the category dropdown menu and populates it with available categories.
 * When a category is selected, it is set using the `selectCategory` function.
 * This function is automatically executed after the DOM has fully loaded.
 * @returns {void}
 */

 document.addEventListener("DOMContentLoaded", function () {
   const categories = ["Technical Task", "User Story", "Design"];
   const categoryDropdown = document.getElementById("category_dropdown_desktop");
   const selectedCategory = document.getElementById("selected_category_desktop");

   categories.forEach((category) => {
    
     let listItem = document.createElement("li");
     listItem.textContent = category;

     
     listItem.setAttribute(
       "onclick",
       `checkCategory('${category}'); selectCategory('${category}')`
     );

    
     categoryDropdown.appendChild(listItem);
   });
 });

function selectCategory(category) {
  const selectedCategory = document.getElementById("selected_category_desktop");
  selectedCategory.textContent = category;
}

/**
 * Initializes the category dropdown menu and adds the available categories.
 * When a category is selected, it is set using the `selectCategory` function.
 * This function is automatically executed after the DOM has loaded.
 * @returns {void}
 */

function toggleDropdown() {
  const categoryDropdown = document.getElementById("category_dropdown_desktop");
  categoryDropdown.classList.toggle("show");
}

/**
 * Selects a category and updates the display with the selected value.
 * Closes the dropdown menu after the selection.
 * @param {string} category - The name of the selected category.
 * @returns {void}
 */

function selectCategory(category) {
  const selectedCategory = document.getElementById("selected_category_desktop");
  selectedCategory.textContent = category;
  const categoryDropdown = document.getElementById("category_dropdown_desktop");
  categoryDropdown.classList.remove("show");
}

/**
 * Opens or closes the contact dropdown menu.
 * The function adds or removes the `show` class to make the dropdown menu
 * visible or hidden.
 * @returns {void}
 */
function toggleContactDropdown() {
  const dropdown = document.getElementById("contact_dropdown");
  dropdown.classList.toggle("show");
}
/**
 * Loads the contacts into the dropdown menu and adds them as an interactive list.
 * Each contact is displayed with an initials circle, a name, and a checkbox.
 * When a checkbox is toggled, the contact is added to or removed from the selection.
 * @returns {void}
 */
function loadContactsInList() {
  const contactDropdown = document.getElementById("contact_dropdown");
  contactDropdown.innerHTML = ""; 

  contacts.forEach((contact, index) => {
      const listItem = document.createElement("li");

      
      const contactItem = document.createElement("div");
      contactItem.classList.add("contact-item");

      const initialsCircle = document.createElement("span");
      initialsCircle.classList.add("contact-initials");
      initialsCircle.textContent = getInitials(contact.name);
      initialsCircle.style.backgroundColor = getColorByIndex(index);

      const label = document.createElement("label");
      label.textContent = contact.name;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = contact.name;

      
      const isSelected = !!document.getElementById(`circle_${contact.name}`);
      if (isSelected) {
          listItem.classList.add("selected");
          checkbox.checked = true;
      }

      
      contactItem.appendChild(initialsCircle);
      contactItem.appendChild(label);
      listItem.appendChild(contactItem);
      listItem.appendChild(checkbox);

      
      listItem.setAttribute("onclick", "selectedContact(this)");

      contactDropdown.appendChild(listItem);
  });
}


function attachClickHandlers() {
  const contactItems = document.querySelectorAll("#contact_dropdown li");

  contactItems.forEach(item => {
        
        item.addEventListener('click', (event) => {
        const checkbox = item.querySelector('input[type="checkbox"]');
      const contactName = checkbox.value;
           
      if (item.classList.contains('selected')) {
                item.classList.remove('selected');
                item.querySelector('input[type="checkbox"]').checked = false;
            toggleContactInCircle(contactName);
              } else {
                 item.classList.add('selected');
                 item.querySelector('input[type="checkbox"]').checked = true;
                toggleContactInCircle(contactName);
            }
            
        });

        const checkbox = item.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.addEventListener('click', (event) => {
                
                event.stopPropagation();
                const contactName = checkbox.value;
                if (checkbox.checked) {
                    item.classList.add('selected');
                    toggleContactInCircle(contactName);
                } else {
                    item.classList.remove('selected');
                    toggleContactInCircle(contactName);
                }
                
            });
        }
    });
}