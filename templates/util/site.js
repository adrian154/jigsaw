const base = require("./base.js");

const generateBody = function(curUser, body) {
    return `
        <div id="main-container">
            <div id="toolbar">
            </div>
            <div id="body-container">
                ${body}
            </div>
        </div>
    `;
};

module.exports = function(curUser, title, body, stylesheets, headExtras) {
    return base(title, [...stylesheets, "/static/styles/site.css"], headExtras, generateBody(curUser, body));
};