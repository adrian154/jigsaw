const generateHead = function(title, stylesheets, headExtras) {
    return `
        <head>
            <meta charset="UTF-8">
            <meta viewport="width=device-width, initial-scale=1">
            <title>${title}</title>
            ${stylesheets.map(stylesheet => `<link rel="stylesheet" href="${stylesheet}">`)}
            ${headExtras}
        </head>
    `;
};

module.exports = function(title, stylesheets, headExtras, body) {
    return `<!DOCTYPE html><html lang="en" dir="ltr">${generateHead(title, [...stylesheets, "/static/styles/common.css"], headExtras)}${body}</html>`;
};