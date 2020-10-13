const resultsTable = document.getElementById("resultsTable");
const consoleArea = document.getElementById("consoleArea");
const synErrorArea = document.getElementById("synErrorArea");

const runButton = document.getElementById("runButton");

const tabResults = document.getElementById("tabResults");
const tabConsole = document.getElementById("tabConsole");
const resultsButton = document.getElementById("resultsButton");
const consoleButton = document.getElementById("consoleButton");

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

const showResultsTab = function() {
    tabResults.style.display = "block"; resultsButton.style.backgroundColor = "#888888";
    tabConsole.style.display = "none"; consoleButton.style.backgroundColor = "#333333";
};

const showConsoleTab = function() {
    tabResults.style.display = "none"; resultsButton.style.backgroundColor = "#333333";
    tabConsole.style.display = "block"; consoleButton.style.backgroundColor = "#888888";
};

const clear = function() {
    synErrorArea.innerHTML = "";
    consoleArea.innerHTML = "";
    resultsTable.innerHTML = "";
};

const showResults = function(results) {

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

let running = false;

// Evaluate code in a web worker to "sandbox" it
// Can still do XHR, etc. but the security risk is low (for now)
const run = function() {

    // Don't re-run function if already evaluating
    if(running)
        return;
    running = true;

    // Create worker
    let code = getWorkerSource(editor.getValue());
    let worker = new Worker(URL.createObjectURL(new Blob([code], {type: "application/javascript"})));

    // Run w/ test cases
    // Small delay, so the user feels like something actually happened
    setTimeout(function() {
        worker.postMessage(testCases);
    }, 200);

    // Clear results
    clear();

    // Update run button
    runButton.innerHTML = "Running...";
    runButton.disabled = true;

    worker.addEventListener("message", (message) => {
        
        // Restore run button
        runButton.innerHTML = "&#9654; Run";
        runButton.disabled = false;

        // Finish up.
        running = false;
        worker.terminate();
        showResults(message.data);
    
    });

    worker.addEventListener("error", (error) => {
    
        synErrorArea.innerHTML = "Fatal: " + error.message;

        // Restore run button
        runButton.innerHTML = "&#9654; Run";
        runButton.disabled = false;

        running = false;
        worker.terminate();

    });

};