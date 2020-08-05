// Dependencies
const express = require("express");
const sqlite = require("better-sqlite3");
const cookieParser = require("cookie-parser");

const routeAuth = require("./routes/auth.js");
const routeSignin = require("./routes/signin.js");
const routeDashboard = require("./routes/dashboard.js");
const routeViewChallenge = require("./routes/viewchallenge.js");
const routeViewProfile = require("./routes/viewprofile.js");

// Local dependencies
const config = require("./config.js");
const Users = require("./users.js");
const Sessions = require("./sessions.js");
const Challenges = require("./challenges.js");

// Tiny function that renders a barebones 500 page.
const format500 = function(error) {
    if(config.PRODUCTION) {
        return `<h1>500 Internal Server Error</h1><p>Something went wrong on our end, and your request could not be completed. Sorry.</p><p>If you are repeatedly receiving this message, please contact us at <a href="mailto:${config.ADMIN_EMAIL}">${config.ADMIN_EMAIL}</a> with information about what led up to the error.</p>`;
    } else {
        return `<p>Something <i><b>really</b></i> bad happened! The error was: </p><pre>${error.stack}</pre><p><i>You are viewing this message because the app is not in a production environment.</i></p>`; 
    }
};

module.exports = function() {

    // Set up app
    this.app = express();
    this.db = sqlite(config.DATABASE_FILE);

    this.users = new Users(this.db);
    this.sessions = new Sessions(this.db);
    this.challenges = new Challenges(this.db);

    // Middleware...
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use("/static", express.static("static"));

    // Add routes (POST)
    this.app.post("/auth", (req, res) => routeAuth(this, req, res));
    
    // Add routes (GET)
    this.app.get("/signin", (req, res) => routeSignin(this, req, res));
    this.app.get("/dashboard", (req, res) => routeDashboard(this, req, res));
    this.app.get("/challenges/:challengeID", (req, res) => routeViewChallenge(this, req, res));
    this.app.get("/profiles/:userID", (req, res) => routeViewProfile(this, req, res));

    // Debug routes
    this.app.get("/bogus", (req, res) => bogus.bogus = 42);

    // Special 500 route (must be last)
    this.app.use((err, req, res, next) => {
        if(req.xhr) {
            res.status(500).json({message: "Internal server error."});
        } else {
            res.status(500).send(format500(err));
        }
    });

    // Start listening
    this.app.listen(config.PORT, () => {
        console.log(`Listening on port ${config.PORT}`);
    });

};