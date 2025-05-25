/**
 * Loads HTML content into elements with the attribute 'w3-include-html', removes the attribute after inclusion,
 * and optionally calls a callback function once all inclusions are completed.
 * @param {Function} [callback] - Optional callback function to execute after all HTML inclusions are completed.
 */
function includeHTML(callback) {
    const elements = document.querySelectorAll('[w3-include-html]');
    let loadCount = 0;

    elements.forEach((el) => {
        const file = el.getAttribute("w3-include-html");
        if (file) {
            fetch(file)
                .then(response => response.text())
                .then(data => {
                    el.innerHTML = data;
                    el.removeAttribute("w3-include-html");
                    loadCount++;
                    if (loadCount === elements.length) {
                        if (callback) callback();
                        setUserInitials();
                    }
                })
                .catch(err => {
                });
        }
    });
}

/**
 * Highlights the menu item corresponding to the current page by adding an 'active' class to the menu item.
 */
function setActiveMenuItem() {
    const currentPage = window.location.pathname.split("/").pop(); 
    const menuItems = document.querySelectorAll('.menu-items'); 
    menuItems.forEach(item => {
        const link = item.getAttribute('href');
        if (link === currentPage) {
            item.classList.add('active'); 
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * Sets the user's initials in the profile section based on the logged-in name stored in localStorage.
 * Defaults to 'TJ' if no logged-in name is found.
 */
function setUserInitials() {
    const loggedInName = localStorage.getItem("loggedInName"); 
    const profileInitialsElement = document.getElementById("profile-initials");

    if (loggedInName && profileInitialsElement) {
        const initials = loggedInName
            .split(" ")
            .map(name => name.charAt(0)) 
            .join("")
            .toUpperCase(); 

        profileInitialsElement.innerText = initials; 
    } else if (profileInitialsElement) {
        profileInitialsElement.innerText = "TJ"; 
    }
}

includeHTML(setActiveMenuItem);
