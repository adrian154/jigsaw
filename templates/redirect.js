const Template = require("./template.js");

module.exports = function() {
    return new Template(
        "Redirect...",
        [],
        [],
        function(target) {
            return `<script>window.location.href = "${target}";</script>`;
        }
    );
};