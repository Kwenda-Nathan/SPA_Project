const urlRoutes = {
    404: {
        template: "templates/404.html",
        title: "Page Not Found",
        description: "The page you are looking for does not exist.",
        css: "styles/404.css",
        js: "scripts/404.js"
    },
    "/": {
        template: "app.html",
        title: "Home - EncryptionSim",
        description: "Welcome to EncryptionSim, a tool for learning about encryption.",
    },
    about: {
        template: "templates/about.html",
        title: "About - EncryptionSim",
        description: "Learn more about EncryptionSim",
        css: "styles/about.css",
        
    },
    service: {
        template: "templates/service.html",
        title: "Services - EncryptionSim",
        description: "Explore the services offered by EncryptionSim.",
        css: "styles/service.css",
        js: ""
    },
    contact: {
        template: "templates/contact.html",
        title: "Contact - EncryptionSim",
        description: "Get in touch with the EncryptionSim team.",
        css: "styles/contact.css",
        js: "scripts/contact.js"
    },
    Caesar: {
        template: "caesar.html",
        title: "Caesar cipher",
        description: "Main application.",
        css: "app.css",
        js: "scripts/app.js"
    },
    XOR: {
        template: "XOR.html",
        title: "XORS cipher",
        description: "Main application.",
        css: "styles/XOR.css",
        js: "scripts/app.js"
    },
    Stash: {
        template: "Stash.html",
        title: "saved data",
        description: "storage unit.",
        css: "styles/stash.css",
        js: "scripts/app.js"
    }
};

const urlLocationHandler = async () => {
    let location = window.location.hash.replace(/^#+/, "") || "/";
    const route = urlRoutes[location] || urlRoutes[404];

    // Update metadata
    document.title = route.title || "EncryptionSim";

    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
        metaDescription.setAttribute("content", route.description || "");
    } else {
        console.warn('Meta description tag not found in the HTML.');
    }

    // Show loading indicator
    const contentDiv = document.getElementById("content");
    if (!contentDiv) {
        console.error('No element with id="content" found in HTML.');
        return;
    }
    contentDiv.innerHTML = "<p>Loading...</p>";

    // Fetch and update content
    try {
        const html = await fetch(route.template)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.text();
            });
        contentDiv.innerHTML = html; // Replace content

        // Load CSS & JS dynamically
        updateStyles(route.css);
        updateScripts(route.js);
    } catch (error) {
        contentDiv.innerHTML = "<h1>Error loading page. Please try again later.</h1>";
        console.error("Error loading content:", error);
    }
};

// Function to dynamically load and replace stylesheets
function updateStyles(cssFile) {
    let existingLink = document.getElementById("dynamic-style");
    if (existingLink) existingLink.remove(); // Remove old CSS

    if (cssFile) {
        let newLink = document.createElement("link");
        newLink.id = "dynamic-style";
        newLink.rel = "stylesheet";
        newLink.href = cssFile; // Load new CSS
        document.head.appendChild(newLink);
    }
}

function updateScripts(jsFile) {
    let existingScript = document.getElementById("dynamic-script");
    if (existingScript) existingScript.remove(); // Remove old script

    if (jsFile) {
        let newScript = document.createElement("script");
        newScript.id = "dynamic-script";
        newScript.src = jsFile;
        newScript.defer = true;
        newScript.onload = () => {
            console.log(`Loaded script: ${jsFile}`);

            // Ensure loadSavedData runs only on the Stash page
            if (jsFile.includes("app.js") && window.location.hash.toLowerCase().includes("stash")) {
                setTimeout(() => {
                    if (typeof loadSavedData === "function") {
                        console.log("Calling loadSavedData()");
                        loadSavedData();
                    } else {
                        console.error("loadSavedData function not found.");
                    }
                }, 500); // Increased delay to ensure DOM readiness
            }
        };
        document.body.appendChild(newScript);
    }
}

// Debounce hash change listener
const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

window.addEventListener("hashchange", debounce(urlLocationHandler, 200));
urlLocationHandler(); // Initial call