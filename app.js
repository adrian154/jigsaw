// Dependencies
const express = require("express");
const sqlite = require("better-sqlite3");
const cookieParser = require("cookie-parser");

const routeAuth = require("./routes/auth.js");
const routeSignin = require("./routes/signin.js");

// Local dependencies
const config = require("./config.js");
const Users = require("./users.js");
const Sessions = require("./sessions.js");

module.exports = function() {

    // Set up app
    this.app = express();
    this.db = sqlite(config.DATABASE_FILE);

    this.users = new Users(this.db);
    this.sessions = new Sessions(this.db);

    // Middleware...
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use("/static", express.static("static"));

    // Add routes
    this.app.post("/auth", (req, res) => routeAuth(this, req, res));
    
    this.app.get("/signin", (req, res) => routeSignin(this, req, res));

    // Special 500 route (must be last)
    this.app.use((err, req, res, next) => {
        if(req.xhr) {
            res.status(500).json({message: "Internal server error."});
        } else {
            res.status(500).send(`Something <i>really</i> bad happened!<pre>${err.stack}</pre>`);
        }
    });

    // Start listening
    this.app.listen(config.PORT, () => {
        console.log(`Listening on port ${config.PORT}`);
    });

};