// Dependencies
const express = require("express");
const sqlite = require("better-sqlite3");
const cookieParser = require("cookie-parser");

// Local dependencies
const config = require("./config.js");

module.exports = function() {

    // Set up app
    this.app = express();
    this.db = sqlite(config.DATABASE_FILE);

    // Middleware...
    this.app.use(cookieParser());

    // Add routes
    this.app.get("/debug", require("./routes/routeDebug.js"));

    // Start listening
    this.app.listen(config.PORT, () => {
        console.log(`Listening on port ${config.PORT}`);
    });

};