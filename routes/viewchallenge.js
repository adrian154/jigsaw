const template = require("../templates/editor.js")();

module.exports = (app, req, res) => {
    
    //console.log(req.params);
    res.send(template.render());

};