const Template = require("./template.js");

module.exports = function(target) {
    return new Template(
        "Redirect...",
        [],
        function() {
            return `<script>window.location.href = "${target}";</script>`;
        }
    );
};