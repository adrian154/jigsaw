const resultsTable = document.getElementById("resultsTable");
const consoleArea = document.getElementById("consoleArea");

const DOMEditor = document.getElementById("topEditor");
const editor = CodeMirror(DOMEditor, {
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

    for(let rowNum = -1; rowNum < results.length; rowNum++) {
        let row = resultsTable.insertRow();
        for(let i = 0; i < 4; i++) {

            let cell = row.insertCell();
            let text;

            if(rowNum == -1) {
                switch(i) {
                    case 0: text = "input data"; break;
                    case 1: text = "expected"; break;
                    case 2: text = "actual"; break;
                    case 3: text = "verdict"; break;
                }
            } else {
                cell.style.fontFamily = "Consolas, monospace";
                let result = results[rowNum];
                switch(i) {
                    case 0: text = testCases[rowNum].params; break;
                    case 1: text = testCases[rowNum].returnValue; break;
                    case 2: text = result.error ? `error (${result.errorMessage})` : result.actual; break;
                    case 3: text = ""; cell.style.backgroundColor = result.pass ? "#00ff00" : "#ff0000"; break;
                }
            }

            cell.appendChild(document.createTextNode(text));

        }
    }

};

const getWorkerSource = function(code) {
    return `

// Message handler: evaluate for test cases
onmessage = (message) => postMessage(message.data.map(testCase => {
    let val;
    try {
        val = ${challengeName}(...testCase.params);
    } catch(error) {
        return {pass: false, error: true, errorMessage: error.message};
    }
    return {pass: val === testCase.returnValue, error: false, actual: val};
}));

// TODO: Implement fake "console" object

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
        showResults(message.data);
    
    };

};