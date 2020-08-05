module.exports = function(date) {
    return `${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};