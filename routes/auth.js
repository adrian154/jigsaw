// Small route to debug request issues
const password = require("../password.js");
const Session = require("../session.js");

module.exports = function(app, req, res) {
    
    res.setHeader("Content-Type", "application/json");

    // Check if request has necessary fields
    if(!req.body.hasOwnProperty("email") || !req.body.hasOwnProperty("password")) {
        res.status(400).json({
            message: "Request was missing fields."
        });
        return;
    }

    // Try to log in user
    // 1 - check if user exists
    let user = app.users.getUserByEmail(req.body.email);
    if(user === null) {
        res.status(400).json({
            message: "No such user exists."
        });
        return;
    }

    // 2 - check if password is correct
    if(!password.verifyPassword(req.body.password, user.passwordHash)) {
        res.status(400).json({
            message: "Incorrect password."
        });
        return;
    }

    // Add session and return
    let sess = app.sessions.createSession(req.ip, user.id);
    res.status(200).json({
        key: sess.key
    });

};