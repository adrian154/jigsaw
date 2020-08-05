const Challenge = function(id, title, description, createDate, creatorID, testCasesJSON) {

    this.id = id;
    this.title = title;
    this.description = description;
    this.createDate = createDate;
    this.creatorID = creatorID;
    this.testCasesJSON = testCasesJSON;

};

module.exports = Challenge;