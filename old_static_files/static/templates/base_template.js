const generateStylesheetLinks = function(stylesheets) {
    return stylesheets.map(stylesheet => `<link rel="stylesheet" href="${stylesheet}">`).join(" ");
};

module.exports = function(title, stylesheets, extraHead, body) {
    return `
        <!DOCTYPE html>
        <html lang="en" dir="ltr">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                ${generateStylesheetLinks(stylesheets)},
                ${extraHead}
                ${title}
            </head>
            <body>
                <div id="content">
                    ${body}
                </div>
                <!-- Chrome bug fix --> 
                <script> </script>
            </body>
        </html>
    `;
};