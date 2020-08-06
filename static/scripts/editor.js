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

let testCases = JSON.parse(challengeTestCasesJSON);

const showResults = function(results) {
    console.log(results);
};

const getWorkerSource = function(code) {
    return `
onmessage = (message) => postMessage(message.data.map(testCase => {
    let val;
    try {
        val = ${challengeName}(...testCase.params);
    } catch(error) {
        return {pass: false, error: error.message};
    }
    return {pass: val === testCase.returnVal, actual: val};
}));
${code}
    `;
};

// Evaluate code in a web worker to "sandbox" it
// Can still do XHR, etc. but the security risk is low (for now)
const run = function() {

    let code = getWorkerSource(editor.getValue());
    console.log(code);
    let worker = new Worker(URL.createObjectURL(new Blob([code], {type: "application/javascript"})));

    // Run w/ test cases
    console.log(testCases);
    worker.postMessage(testCases);

    worker.onmessage = (message) => {
        
        // This guy is done.
        worker.terminate();

        // Show results.
        showResults(message);
    
    };

};