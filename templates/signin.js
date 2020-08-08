const Template = require("./template.js");

module.exports = function() {
    return new Template(
        "Sign In",
        ["/static/styles/signin.css"],
        [],
        function() {
            return `
<div id="signInContainer">
    <img src="/static/images/logo_dark_on_light.png" style="width: 50%;">
    <form id="signInArea">

        <p id="message"></p>

        <span><b>Email</b></span>
        <input type="text" placeholder="Email..." id="fieldEmail"><br>

        <span><b>Password</b></span>
        <input type="password" placeholder="Password..." id="fieldPassword"><br>

        <p><a href="#">Forgot password?</a></p>

        <button id="signInButton" type="submit"><b>Sign In</b></button>
    </form>
    <script type="text/javascript" src="/static/scripts/auth.js"></script>
</div>
            `;
        }
    );
};