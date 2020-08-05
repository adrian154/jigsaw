const Challenge = require("./challenge.js");
const config = require("./config.js");

// Module that accesses the database
const Challenges = function(db) {

    this.db = db;

    this.addOrUpdateChallenge = function(challenge) {
        let info = db.prepare("INSERT OR REPLACE INTO challenges (title, description, createDate, creatorID, testCasesJSON) VALUES (@title, @description, @createDate, @creatorID, @testCasesJSON)").run({
            id: challenge.id,
            title: challenge.title,
            description: challenge.description,
            createDate: challenge.createDate,
            creatorID: challenge.creatorID,
            testCasesJSON: challenge.testCasesJSON
        });
        return this.getChallengeByROWID(info.lastInsertRowid);
    };

    this.getChallengesWhere = function(SQLCondition, bindParams) {
        let query = `SELECT * FROM challenges WHERE ${SQLCondition}`;
        return db.prepare(query).all(bindParams).map((result) => new Challenge(
            result.id,
            result.title,
            result.description,
            result.createDate,
            result.creatorID,
            result.testCasesJSON
        ));
    };

    this.getChallengeWhere = function(SQLCondition, bindParams) {
        let res = this.getChallengesWhere(SQLCondition, bindParams);
        return res.length > 0 ? res[0] : null;
    };

    this.getChallengeByROWID  = function(ROWID) {
        return this.getChallengeWhere("rowid = @rowid", {rowid: ROWID});
    };

    this.getChallengeByID = function(id) {
        return this.getChallengeWhere("id = @id", {id: id});
    };

    this.deleteChallenge = function(challenge) {
        db.prepare("DELETE FROM challenges WHERE id = @id").run({
            id: challenge.id
        });
    };

};

module.exports = Challenges;