module.exports = (req, res) => {
    res.send(require("../templates/util/form.js")("Sign In", "cock"));
};