const Template = require("./template.js");

module.exports = function() {
    return new Template(
        "Register",
        ["/static/styles/signin.css"],
        [],
        function() {
            return `
<div id="signInContainer">
    <h2 class="text-centered">Register</h2>
    <form id="signInArea">
        <p id="message"></p>
        <span><b>Username</b></span>
        <input type="text" placeholder="Username..." id="fieldUsername"><br>
        <span><b>Email</b></span>
        <input type="text" placeholder="Email..." id="fieldEmail"><br>
        <span><b>Password</b></span>
        <input type="password" placeholder="Password..." id="fieldPassword"><br>
        <span><b>Password Retyped</b></span>
        <input type="password" placeholder="Password, again..." id="fieldPasswordTyped"><br>
        <button id="signInButton" type="button"><b>Register</b></button>
    </form>
    <script type="text/javascript" src="/static/scripts/register.js"></script>
</div>
            `;
        }
    );
};