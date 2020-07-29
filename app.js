// Dependencies
const express = require("express");
const sqlite = require("better-sqlite3");

// Local dependencies
const config = require("./config.js");

module.exports = function() {

    // Set up app
    this.app = express();
    this.db = sqlite(config.DATABASE_FILE);

    // Start listening
    app.listen(config.PORT, () => {
        console.log(`Listening on port ${config.PORT}`);
    });

};