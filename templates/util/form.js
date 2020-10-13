const parent = require("./base.js");

const generateBody = function(title, body) {
    return `
        <div id="center-column">
            <div id="form-outer">
                <h2 class="centered-text">${title}</h2>
                <div id="form-inner">
                    ${body}
                </div>
            </div>
        </div>
    `;
};

module.exports = function(title, body) {
    return parent(title, ["/static/styles/form.css"], "", generateBody(title, body));
};