const tplRedirect = require("../templates/redirect.js");

const redirectSignin = function() {
    res.send(tplRedirect().render("/signin"));
};

module.exports = function(app, req, res) {

    // Get user by cookie
    if(req.cookies.key) {

        let session = app.sessions.getSessionByKey(req.cookies.key);
        if(session === null) {
            // Invalid session key
            res.clearCookie("key");
            redirectSignin();
            return;
        }

        let user = app.users.getUserByID(session.ownerID);
        if(user === null) {
            // Valid session, invalid user
            res.clearCookie("key");
            app.sessions.deleteSession(session);
            redirectSignin();
            return;
        }
        s
        res.send(tplRedirect().render(`/profiles/${user.id}`));

    } else {
        redirectSignin();
    }

};