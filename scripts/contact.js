let selectedContactIndex = null;

/**
 * Loads contacts from Firebase and renders them to the UI.
 */
function loadContacts() {
    loadContactsFromFirebase()
    renderContacts();
}

/**
 * Renders a section for contacts grouped by their starting letter.
 * @param {string} firstLetter - The first letter of the contacts in this section.
 */
function renderLetterSection(firstLetter) {
    let contactList = document.querySelector('.contacts-list');
    let letterSection = document.createElement('div');
    letterSection.classList.add('letter-section');
    letterSection.textContent = firstLetter;
    contactList.appendChild(letterSection);
    let hr = document.createElement('hr');
    contactList.appendChild(hr);
}

/**
 * Renders a single contact in the contact list.
 * @param {Object} contact - The contact object containing name, email, and other details.
 * @param {number} index - The index of the contact in the list.
 */
function renderSingleContact(contact, index) {
    let contactList = document.querySelector('.contacts-list');
    let contactDiv = document.createElement('div');
    contactDiv.classList.add('contact');
    contactDiv.id = `contact-${index}`; 
    let circleDiv = document.createElement('div');
    circleDiv.classList.add('circle');
    circleDiv.style.backgroundColor = getColorByIndex(index);
    circleDiv.textContent = getInitials(contact.name);
    const contactDetailsDiv = document.createElement('div');
    contactDetailsDiv.classList.add('contact-details');
    contactDetailsDiv.innerHTML = `
        <p class="contact-name">${contact.name}</p>
        <p class="contact-email">${contact.email}</p>
    `;

    contactDiv.appendChild(circleDiv);
    contactDiv.appendChild(contactDetailsDiv);
    contactDiv.setAttribute('onclick', `handleContactClick(${index})`);
    contactList.appendChild(contactDiv);
}

/**
 * Renders the complete contact list grouped by the starting letter of each contact's name.
 */
function renderContacts() {
    let contactList = document.querySelector('.contacts-list');
    contactList.innerHTML = ''; 
    let currentLetter = '';
    let sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
    sortedContacts.forEach((contact, index) => {
        let firstLetter = contact.name[0].toUpperCase();
        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;
            renderLetterSection(firstLetter); 
        }
        renderSingleContact(contact, index); 
    });

    if (sortedContacts.length === 0) {
        let noContactsMsg = document.createElement('p');
        noContactsMsg.textContent = 'Keine Kontakte vorhanden.';
        contactList.appendChild(noContactsMsg);
    }
}

/**
 * Displays the details of a selected contact.
 * @param {Object} contact - The contact object containing name, email, and phone.
 * @param {number} index - The index of the selected contact.
 */
function showContactDetails(contact, index) {
    let contactNameElement = document.getElementById('contact-name');
    let contactEmailElement = document.getElementById('contact-email');
    let contactPhoneElement = document.getElementById('contact-phone');
    let contactAvatarElement = document.getElementById('contact-avatar');
    contactNameElement.textContent = contact.name;
    contactEmailElement.textContent = contact.email;
    contactPhoneElement.textContent = contact.phone;
    contactAvatarElement.textContent = getInitials(contact.name);
    contactAvatarElement.style.backgroundColor = getColorByIndex(index);

    let contactInfo = document.getElementById('contact-info');
    contactInfo.classList.remove('hidden');  
    contactInfo.style.display = 'block';    

    const contactInfoContainer = document.getElementById('contact-info-container');
    if (window.innerWidth < 1024) {
        contactInfoContainer.style.display = 'block';  
    }
    contactInfoContainer.classList.remove('hidden');
}

/**
 * Hides the currently displayed contact details.
 */
function hideContactDetails() {
    let contactInfoContainer = document.getElementById('contact-info');
    contactInfoContainer.classList.add('hidden');
    selectedContactIndex = null;
}

/**
 * Conditionally hides contact details based on the screen width.
 */
function hideContactDetailsSmart() {
    let contactInfoContainer = document.getElementById('contact-info-container');
    if (window.innerWidth < 1024) {
        contactInfoContainer.style.display = 'none';
    } else {
        contactInfoContainer.style.display = 'block';
    }

    document.getElementById(`contact-${selectedContactIndex}`).classList.remove('selected-contact');
    hideContactDetails();
    hideSmartEditButton();
    selectedContactIndex = null;
}

/**
 * Handles the click event on a contact and toggles the display of its details.
 * @param {number} index - The index of the clicked contact.
 */
function handleContactClick(index) {
    let contact = contacts[index]; 
    if (selectedContactIndex !== null) {
        document.getElementById(`contact-${selectedContactIndex}`).classList.remove('selected-contact');
    }
    if (selectedContactIndex === index) {
        hideContactDetails(); 
        selectedContactIndex = null; 
    } else {
        showContactDetails(contact, index); 
        document.getElementById(`contact-${index}`).classList.add('selected-contact');
        selectedContactIndex = index; 
    }
    showSmartEditButton();
}

/**
 * Handles the form submission for adding a new contact.
 * @param {Event} event - The form submission event.
 */
function submitAddContactForm(event) {
    event.preventDefault(); 
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    addContact(name, email, phone);
    closeModalFunction();
}

/**
 * Sends an email to the selected contact.
 */
function sendEmail() {
    if (selectedContactIndex !== null) {
        let email = contacts[selectedContactIndex].email;
        window.location.href = `mailto:${email}`;
    } else {
        alert("Kein Kontakt ausgewählt.");
    }
}
