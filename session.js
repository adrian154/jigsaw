const Session = function(ip, key, ownerID) {
    this.ip = ip;
    this.key = key;
    this.ownerID = ownerID;
};

module.exports = Session;