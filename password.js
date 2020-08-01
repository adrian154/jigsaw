const crypto = require("crypto");
const config = require("./config.js");

const generateSalt = function() {
    return crypto.randomBytes(config.PHASH_SALT_SIZE).toString("base64");
};

const hashPassword = function(password) {
    
    let salt = generateSalt();
    let hash = crypto.pbkdf2Sync(password, salt, config.PHASH_ITERATIONS, config.PHASH_KEYLEN, config.PHASH_DIGEST).toString("hex");

    return [salt, hash].join(",")

};

const verifyPassword = function(password, passwordHash) {

    let split = passwordHash.split(",");
    return split[1] === crypto.pbkdf2Sync(password, split[0], config.PHASH_ITERATIONS, config.PHASH_KEYLEN, config.PHASH_DIGEST).toString("hex");

};

module.exports = {
    hashPassword: hashPassword,
    verifyPassword: verifyPassword
};