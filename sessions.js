const Session = require("./session.js");
const crypto = require("crypto");
const config = require("./config.js");

const genSessionKey = function() {
    return crypto.randomBytes(config.SESSION_KEYLEN).toString("hex");
};

// Module that accesses the database
const Sessions = function(db) {

    this.db = db;

    this.addOrUpdateSession = function(session) {
        let info = db.prepare("INSERT OR REPLACE INTO sessions (IP, key, userID) VALUES (@ip, @key, @userID)").run({
            ip: session.ip,
            key: session.key,
            userID: session.ownerID
        });
        return this.getSessionByROWID(info.lastInsertRowid);
    };

    this.createSession = function(ip, userID) {
        return this.addOrUpdateSession(new Session(ip, genSessionKey(), userID));
    };

    this.getSessionsWhere = function(SQLCondition, bindParams) {
        let query = `SELECT * FROM sessions WHERE ${SQLCondition}`;
        return db.prepare(query).all(bindParams);
    };

    this.getSessionWhere = function(SQLCondition, bindParams) {
        let res = this.getSessionsWhere(SQLCondition, bindParams);
        return res.length > 0 ? res[0] : null;
    };

    this.getSessionByROWID  = function(ROWID) {
        return this.getSessionWhere("rowid = @rowid", {rowid: ROWID});
    };

    this.getSessionByKey = function(key) {
        return this.getSessionWhere("key = @key", {key: key});
    };

    this.deleteSession = function(session) {
        db.prepare("DELETE FROM sessions WHERE key = @key").run({
            key: session.key
        });
    };

};

module.exports = Sessions;