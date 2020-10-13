const parent = require("./base_template.js");

const generateHeader = function(curUser) {
    return `
        <div id="header">
            <img src="/static/images/logo_light_on_dark.png">
            <button>Home</button>
        </div>
    `;
};

const generateBody = function(curUser, body) {
    return generateHeader(curUser) + body;
};

module.exports = function(curUser, title, otherStylesheets, extraHead, body) {
    return parent(title + " - jigsaw", [...otherStylesheets, "/static/styles/site.css"], extraHead, generateBody(curUser, body));
};