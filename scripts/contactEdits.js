/**
 * Adds a new contact to the contact list and updates Firebase.
 * @param {string} name - The name of the contact.
 * @param {string} email - The email address of the contact.
 * @param {string} phone - The phone number of the contact.
 */
function addContact(name, email, phone) {
    let newContact = { name, email, phone };
    contacts.push(newContact);
    renderContacts();
    addContactsToFirebase();
}

/**
 * Opens the modal to add a new contact, setting up the UI for the add operation.
 */
function openAddContact() {
    let contactModal = document.getElementById('contact-modal');
    document.getElementById('modal-title').textContent = 'Add contact'; 
    document.querySelector('.create-button').style.display = 'block';   
    document.querySelector('.save-button').style.display = 'none';     
    document.querySelector('.blue-button').style.display = 'block';  
    document.querySelector('.delete-button').style.display = 'none';   

    contactModal.classList.remove('d-none'); 
    contactModal.style.display = 'flex';     
}

/**
 * Opens the modal to edit an existing contact, populating fields with the contact's details.
 */
function editContact() {
    let contact = contacts[selectedContactIndex];
    let contactModal = document.getElementById('contact-modal');
    document.getElementById('name').value = contact.name || ''; 
    document.getElementById('email').value = contact.email || '';
    document.getElementById('phone').value = contact.phone || ''; 
    document.getElementById('modal-title').textContent = 'Edit contact'; 
    wrongNameMessage.style.display = 'none';
    wrongMailMessage.style.display = 'none';
    wrongNumberMessage.style.display = 'none';
    document.querySelector('.create-button').style.display = 'none';  
    document.querySelector('.save-button').style.display = 'block';   
    document.querySelector('.blue-button').style.display = 'none';   
    document.querySelector('.delete-button').style.display = 'block';  
    contactModal.classList.remove('d-none');
    contactModal.style.display = 'flex';    
}

/**
 * Saves the updated contact details and updates Firebase.
 */
function saveContact() {
    let updatedName = document.getElementById('name').value.trim();
    let updatedEmail = document.getElementById('email').value.trim();
    let updatedPhone = document.getElementById('phone').value.trim();

    if (!validateEmail(updatedEmail)) {
        alert('Bitte eine gültige E-Mail eingeben.');
        return;
    }

    if (!validatePhone(updatedPhone)) {
        alert('Bitte eine gültige Telefonnummer mit mindestens 8 Nummern eingeben.');
        return;
    }

    contacts[selectedContactIndex].name = updatedName;
    contacts[selectedContactIndex].email = updatedEmail;
    contacts[selectedContactIndex].phone = updatedPhone;

    addContactsToFirebase();
    renderContacts();
    showContactDetails(contacts[selectedContactIndex], selectedContactIndex);
    closeModalFunction();
    closeConfirmationModal2();
}

/**
 * Deletes the selected contact from the list and Firebase.
 */
function deleteContact() {
    if (selectedContactIndex !== null) {
        let contactName = contacts[selectedContactIndex].name;
        contacts.splice(selectedContactIndex, 1);
        renderContacts();
        hideContactDetails();
        closeModalFunction();
        deleteContactFromFirebase(contactName);
        closeConfirmationModal();
    } else {
        alert('Kein Kontakt ausgewählt.');
    }
}

/**
 * Closes the contact modal and resets the form fields.
 */
function closeModalFunction() {
    let contactModal = document.getElementById('contact-modal');
    contactModal.style.display = 'none'; 

    let form = document.querySelector('.contact-form');
    form.reset(); 

    wrongNameMessage.style.display = 'none';
    wrongMailMessage.style.display = 'none';
    wrongNumberMessage.style.display = 'none';

    document.querySelector('.create-button').style.display = 'block';  
    document.querySelector('.save-button').style.display = 'none';     
    document.querySelector('.blue-button').style.display = 'block';    
    document.querySelector('.delete-button').style.display = 'none';  

    createContactBtn.disabled = true;
    createContactBtn.classList.add('disabled');
}

/**
 * Opens the first confirmation modal.
 */
function openConfirmationModal() {
    let confirmationModal = document.getElementById('confirmation-modal');
    confirmationModal.classList.remove('hidden');
    confirmationModal.classList.add('show');  
}

/**
 * Closes the first confirmation modal.
 */
function closeConfirmationModal() {
    let confirmationModal = document.getElementById('confirmation-modal');
    confirmationModal.classList.remove('show');
    confirmationModal.classList.add('hidden');
}

/**
 * Opens the second confirmation modal.
 */
function openConfirmationModal2() {
    let confirmationModal = document.getElementById('confirmation-modal2');
    confirmationModal.classList.remove('hidden');
    confirmationModal.classList.add('show'); 
}

/**
 * Closes the second confirmation modal.
 */
function closeConfirmationModal2() {
    let confirmationModal = document.getElementById('confirmation-modal2');
    confirmationModal.classList.remove('show');
    confirmationModal.classList.add('hidden');
}

/**
 * Displays the smart edit button and hides the menu button.
 */
function showSmartEditButton() {
    let smartEditButton = document.getElementById('smart-edit-button');
    let MenuButton = document.getElementById('menu-button')

    MenuButton.classList.add('hidden');
    smartEditButton.classList.remove('hidden');
}

/**
 * Hides the smart edit button and shows the menu button.
 */
function hideSmartEditButton() {
    let smartEditButton = document.getElementById('smart-edit-button');
    let MenuButton = document.getElementById('menu-button')

    MenuButton.classList.remove('hidden');
    smartEditButton.classList.add('hidden');
}

/**
 * Handles clicks outside of the edit menu to close it if open.
 * @param {Event} event - The click event.
 */
function handleClickOutside(event) {
    let editButtonMenu = document.getElementById('editButtonMenu');
    let isClickInsideMenu = editButtonMenu.contains(event.target);

    if (!isClickInsideMenu && !editButtonMenu.classList.contains('hidden')) {
        closeEditContactMenu();
    }
}

/**
 * Opens the edit menu and sets up a click listener for closing it.
 */
function openEditContactMenu() {
    let editButtonMenu = document.getElementById('editButtonMenu');
    editButtonMenu.classList.remove('hidden');

    setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
    }, 0);
}

function handleClickOutside(event) {
    let editButtonMenu = document.getElementById('editButtonMenu');

    if (!editButtonMenu.contains(event.target)) {
        closeEditContactMenu();
    }
}

/**
 * Closes the edit contact menu and removes the click listener.
 */
function closeEditContactMenu() {
    let editButtonMenu = document.getElementById('editButtonMenu');
    editButtonMenu.classList.add('hidden');

    document.removeEventListener('click', handleClickOutside);
}
