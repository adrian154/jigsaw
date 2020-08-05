const User = require("./user.js");

// Module that accesses the database to retrieve user information.
const Users = function(db) {
    
    this.db = db;

    this.addOrUpdateUser = function(user) {
        let info = db.prepare("INSERT OR REPLACE INTO users (username, passwordHash, email, xp, bio, joinDate) VALUES (@username, @passwordHash, @email, @xp, @bio, @joinDate)").run({
            username: user.username,
            passwordHash: user.passwordHash,
            email: user.email,
            xp: user.xp,
            bio: user.bio,
            joinDate: user.joinDate
        });
        return this.getUserByROWID(info.lastInsertRowid);
    };

    this.getUsersWhere = function(SQLCondition, bindParams) {
        let query = `SELECT * FROM users WHERE ${SQLCondition}`;
        return db.prepare(query).all(bindParams).map((result) => new User(
            result.id,
            result.username,
            result.passwordHash,
            result.email,
            result.xp,
            result.bio,
            result.joinDate
        ));
    };

    this.getUserWhere = function(SQLCondition, bindParams) {
        let res = this.getUsersWhere(SQLCondition, bindParams);
        return res.length > 0 ? res[0] : null;
    };

    this.getUserByROWID = function(ROWID) {
        return this.getUserWhere("rowid = @rowid", {rowid: ROWID});
    };

    this.getUserByID = function(id) {
        return this.getUserWhere("id = @id", {id: id});
    };

    this.getUserByName = function(name) {
        return this.getUserWhere("name = @name", {name: name});
    };
    
    this.getUserByEmail = function(email) {
        return this.getUserWhere("email = @email", {email: email});
    };

    this.deleteUser = function(user) {
        db.run("DELETE FROM users WHERE userID = @userID").run({
            userID: user.id
        });
    };

};

module.exports = Users;