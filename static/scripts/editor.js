let DOMEditor = document.getElementById("topEditor");
let editor = CodeMirror(DOMEditor, {
    mode: "javascript",
    theme: "material",
    lineNumbers: true,
    lineWrapping: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    indentUnit: 4,
    indentWithTabs: true
});