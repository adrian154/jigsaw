const Express = require("express");
const CookieParser = require("cookie-parser");
const BodyParser = require("body-parser");
const fs = require("fs");

// Internal dependencies
const config = require("./config.json");

class App {

    constructor() {
        
        this.config = config;
        this.loadData();
       
        this.app = Express();
        
        this.registerRoutes();
        this.initMiddleware();
        
        this.app.listen(80, () => {
            console.log("Web server started.");
        });

    }

    loadData() {
        let data = fs.readFileSync("./data.json");
        this.data = JSON.parse(data);
    }

    initMiddleware() {

        this.app.use(CookieParser());
        this.app.use(BodyParser.json());
        this.app.use("/static", Express.static(__dirname + "/static"));

        // Auth
        this.app.use((req, res, next) => {

            next();

        });

        // Debugging routes
        this.app.use((req, res, next) => {
            res.status(404);
            res.send("Not Found");
        });

        this.app.use((error, req, res, next) => {
            res.status(500);
            res.send(error.stack);
        });

    }

    registerRoutes() {

        const routes = {
            "/": {method: "get", handler: require("./routes/homepage.js")},
            "/register": {method: "get", handler: require("./routes/register.js")},
            "/settings": {method: "get", handler: require("./routes/settings")},
            "/signin": {method: "get", handler: require("./routes/signin.js")},
            "/signout": {method: "get", handler: require("./routes/signout.js")},
            "/submit": {method: "get", handler: require("./routes/submit.js")},
            "/viewprofile/:userID": {method: "get", handler: require("./routes/viewprofile.js")},
            "/workspace/:problemID": {method: "get", handler: require("./routes/workspace.js")}
        };

        for(let routeName of Object.keys(routes)) {
            let route = routes[routeName];
            this.app[route.method](routeName, route.handler);
        }

    }

}

const app = new App();