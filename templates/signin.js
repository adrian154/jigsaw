const Template = require("./template.js");

module.exports = function() {
    return new Template(
        "Sign In",
        ["/static/styles/signin.css"],
        function() {
            return `
<div id="signInContainer">
    <img src="/static/images/logo_transparent_gray.png" style="width: 50%;">
    <form id="signInArea">

        <span><b>Email</b></span>
        <input type="text" placeholder="Email..." id="fieldUsername"><br>

        <span><b>Password</b></span>
        <input type="password" placeholder="Password..." id="fieldPassword"><br>

        <p><a href="#">Forgot password?</a></p>

        <button id="signInButton"><b>Sign In</b></button>
    </form>
</div>
            `;
        }
    );
};