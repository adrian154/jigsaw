const parent = require("./base.js");

const generateBody = function(title, body) {
    return `
        <div id="center-column">
            <div id="form-outer">
                <h2>${title}</h2>
                ${body}
            </div>
        </div>
    `;
};

module.exports = function(title, body) {
    return parent(title, ["/form.css"], "", generateBody(title, body));
};