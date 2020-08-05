let editor = CodeMirror(document.getElementById("topEditor"), {
    mode: "javascript",
    lineNumbers: true,
    lineWrapping: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    indentUnit: 4,
    indentWithTabs: true
});