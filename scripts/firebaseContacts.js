const BASE_URL =
  "https://join-375-default-rtdb.europe-west1.firebasedatabase.app/";

let contacts = [];

async function loadContactsFromFirebase(path = "contacts") {
    try {
        let response = await fetch(`${BASE_URL}${path}.json`);
        let loadedContacts = await response.json();

        if (loadedContacts) {
            contacts = Object.keys(loadedContacts).map(nameKey => {
                let contact = loadedContacts[nameKey];
                return {
                    id: nameKey,
                    name: contact.name,
                    email: contact.email,
                    phone: contact.phone
                };
            });
            renderContacts(); 
        }
    } catch (error) {
    }
}

async function addContactsToFirebase() {
    contacts.forEach(async (contact) => {
        await fetch(`${BASE_URL}contacts/${contact.name}.json`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: contact.name,
                email: contact.email,
                phone: contact.phone
            }),
        });
    });
}

async function deleteContactFromFirebase(contactName) {
    try {
        await fetch(`${BASE_URL}contacts/${contactName}.json`, {
            method: "DELETE"
        });
    } catch (error) {        
    }
}
