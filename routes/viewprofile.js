module.exports = (app, req, res) => {
    console.log(req.params);
    res.send(`hi, ${req.params.userID}`);
};