// Small route to debug request issues
module.exports = function(req, res) {
    res.setHeader("Content-Type", "text/html");
    res.send(`<pre>The server is probably not on fire.\nGET params: ${JSON.stringify(req.query)}\nCookies: ${JSON.stringify(req.cookies)}\nRequest header: ${JSON.stringify(req.headers)}</pre>`);
};