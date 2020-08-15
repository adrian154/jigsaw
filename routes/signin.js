const tplSignin = require("../templates/signin.js");
const tplRedirect = require("../templates/redirect.js");

const sendSigninPage = function(res) {
    res.send(tplSignin().render());
};

const redirectToDashboard = function(res, user) {
    res.send(tplRedirect().render("/dashboard"));
};

module.exports = function(app, req, res) {

    // Get user by cookie
    // If user is signed in, redirect to user page
    if(req.cookies.key) {
    
        let session = app.sessions.getSessionByKey(req.cookies.key);
        if(session === null) {
            // The user's session is invalid. Clear it.
            console.log("DEBUG: invalid session (key sent but not found)");
            res.clearCookie("key");
            sendSigninPage(res);
            return;
        }

        let user = app.users.getUserByID(session.ownerID);
        if(user === null) {
            // The user's session exists, but the user's account does not.
            // Someone probably tried to delete an account without deleting all their sessions.
            // Delete the session and clear the cookie.
            console.log("DEBUG: invalid session (key sent but owner doesn't exist)");
            res.clearCookie("key");
            app.sessions.deleteSession(session);
            sendSigninPage(res);
            return;
        }

        // (The user isn't signed in)
        redirectToDashboard(res, user);

    } else {
        sendSigninPage(res);
    }

};