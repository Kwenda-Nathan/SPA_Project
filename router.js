document.addEventListener("click", (e) => {
    const {target} = e;
    if (!target.matches("nav a") ) {
        return;
    }
    e.preventDefault();
    urlRoute();
})

const urlRoutes ={
    404: {
        template: "404.html",
        title: "",
        description: ""
    },
    "/": {
        template: "SPAIndex.html",
        title: "",
        description: ""
    },
    "/about": {
        template: "about.html",
        title: "",
        description: ""
    },
    "/service": {
        template: "service.html",
        title: "",
        description: ""
    },
    "/contact": {
        template: "contact.html",
        title: "",
        description: ""
    }
}

const urlRoute = (event) =>{
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    urlLocationHandler();
}

const urlLocationHandler = async () => {
    const location = window.location.pathname;
    if(location.length == 0) {
        location = "/";
    }

    const route = urlRoutes[location] || urlRoutes[404];
    const html = await fetch(route.template).then ((response) =>
    response.text());
    document.getElementById("content").innerHTML = html;
}

window.onpopstate = urlLocationHandler;
window.route = urlRoute;

urlLocationHandler();