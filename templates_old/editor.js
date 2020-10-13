const Template = require("./template.js");

module.exports = function() {
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
        function(challenge) {
            return `
<div id="header">
    <img src="/static/images/logo_light_on_dark.png">
    <button class="headerButton">Home</button>
    <button class="headerButton">Home</button>
    <button class="headerButton">Home</button>
</div>

<div id="editorArea">
    <div id="leftPane">
        <span>
            <span style="font-size: 30px; font-weight: bold;">problem</span>
            <button class="votingButton">▲</button>
            1738
            <button class="votingButton">▼</button>
        </span>
        <p>problem?</p>
    </div>
    <div id="rightPane">
        <div id="topEditorOuter">
            <div id="topEditor"></div>
        </div>
        <div id="bottomOutput">
        <div id="selector">
            <button class="headerButton" id="runButton" onclick="run()">&#9654; Run</button>
            <button class="headerButton" id="resultsButton" onclick="showResultsTab()" style="background-color: #888888;">Results</button>
            <button class="headerButton" id="consoleButton" onclick="showConsoleTab()">Console</button>
        </div>
        <div id="bottomInner">
            <div id="tabResults">
                <pre id="synErrorArea"></pre>
                <table id="resultsTable"></table>
            </div>
            <div id="tabConsole">
                <pre id="consoleArea"></pre>
            </div>
        </div>
    </div>
</div>

<script src="/static/scripts/editor.js"></script>
            `;
        }
    );
};