const Express = require("express");
const fs = require("fs");

class App {

    constructor() {
        
        this.config = config;
        loadData();
       
        this.app = Express();
        registerRoutes();

    }

    loadData() {
        let data = fs.readFileSync("./data.json");
        this.data = JSON.parse(data);
    }

    registerRoutes() {

        const routes = {
            "/": {
                method: "get",
                handler: require("./routes/homepage.js")
            }
        };

        for(let routeName of Object.keys(routes)) {
            let route = routes[routeName];
            this.app[route.method](routeName, route.handler);
        }

    }

}