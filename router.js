document.addEventListener("DOMContentLoaded", () => {
    urlLocationHandler();
    window.addEventListener("hashchange", urlLocationHandler);
});


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
    about: {
        template: "about.html",
        title: "",
        description: ""
    },
    service: {
        template: "service.html",
        title: "",
        description: ""
    },
    contact: {
        template: "contact.html",
        title: "",
        description: ""
    }
}



const urlLocationHandler = async () => {
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


urlLocationHandler();