const config = require("./config.js");
const sqlite = require("better-sqlite3");
const db = sqlite(config.DATABASE_FILE);

const User = require("./user.js");
const Users = require("./users.js");
const users = new Users(db);

/*
let newUsr = users.addOrUpdateUser(new User(undefined, "AKARH", "dummy", "akarsh@akras.gov", 0, "bio goes here", Date.now()));
console.log(newUsr);
console.log(users.getUserByID(1));
*/