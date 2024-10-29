// frontend/js/router.js
window.addEventListener("hashchange", () => {
    route(window.location.hash.substring(1));
});

function fetchView(view) {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = ''; // Clear existing content before loading new content

    fetch(`${view}.html`)
        .then(response => response.text())
        .then(html => {
            appDiv.innerHTML = html; // Load new content
        })
        .catch(error => {
            console.error('Failed to load the page:', error);
            appDiv.innerHTML = '<p>Error loading page. Please try again later.</p>';
        });
}

function route(path) {
    if (!path) {
        window.location.hash = '#/'; // Default to home if no hash is present
        path = 'home'; // Load 'home.html' as the default content
    } else {
        path = path.replace('/', ''); // Normalize the path
    }
    fetchView(path);
}

docu
