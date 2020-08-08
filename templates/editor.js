const Template = require("./template.js");

module.exports = function(challenge) {
    return new Template(
        "Editor",
        [
            "/static/styles/editor.css",
            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.56.0/codemirror.min.css",
            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.56.0/theme/material.min.css"
        ],
        [
            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.56.0/codemirror.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.56.0/addon/edit/matchbrackets.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.56.0/addon/edit/closebrackets.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.56.0/mode/javascript/javascript.min.js"
        ],
        function() {
            return `
            `;
        }
    );
};