const tplRegister = require("../templates/register.js")();

const sendPage = function(res) {
    res.send(tplRegister.render());
};

module.exports = function(app, req, res) {

    if(req.cookies.key) {

        let session = app.sessions.getSessionByKey(req.cookies.key);
        if(session === null) {
            res.clearCookie("key");
            sendPage(res);
            return;
        }

        let user = app.users.getUserByID(session.ownerID);
        if(user === null) {
            res.clearCookie("key");
            app.sessions.deleteSession(session);
            sendPage(res);
            return;
        }

        res.redirect("/dashboard");

    } else {
        sendPage(res);
    }

};