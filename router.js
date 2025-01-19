

const urlRoutes ={
    404: {
        template: "templates/404.html/",
        title: "Page Not Found",
        description: "The page you are looking for does not exist."
    },
    "/": {
        template: "app.html",
        title: "Home - EncryptionSim",
        description: "Welcome to EncryptionSim, a tool for learning about encryption."
    },
    about: {
        template: "templates/about.html",
        title: "About - EncryptionSim",
        description: "Learn more about EncryptionSim"
    },
    service: {
        template: "templates/Service.html",
        title: "Services - EncryptionSim",
        description: "Explore the services offered by EncryptionSim."
    },
    contact: {
        template: "templates/contact.html",
        title: "Contact - EncryptionSim",
        description: "Get in touch with the EncryptionSim team."
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
    } catch (error) {
        contentDiv.innerHTML = "<h1>Error loading page. Please try again later.</h1>";
        console.error("Error loading content:", error);
    }
};

// Debounce hash change listener
const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

const metaDescription = document.querySelector("meta[name='description']");
if (metaDescription) {
    console.log("Meta description tag found. Updating...");
    metaDescription.setAttribute("content", route.description || "");
} else {
    console.warn('Meta description tag not found in the HTML.');
}

window.addEventListener("hashchange", debounce(urlLocationHandler, 200));
urlLocationHandler(); // Initial call

/*const urlLocationHandler = async () => {
    var location = window.location.hash.replace("#", "");
    if(location.length == 0) {
        location = "/";
    }

    const route = urlRoutes[location] || urlRoutes[404];
    const html = await fetch(route.template).then ((response) =>
    response.text());
    document.getElementById("content").innerHTML = html;
}

window.addEventListener("hashchange", urlLocationHandler);


urlLocationHandler();*/