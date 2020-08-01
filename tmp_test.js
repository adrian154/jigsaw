const config = require("./config.js");
const sqlite = require("better-sqlite3");
const db = sqlite(config.DATABASE_FILE);

const User = require("./user.js");
const Users = require("./users.js");
const password = require("./password.js");
const users = new Users(db);

/*
let newUsr = users.addOrUpdateUser(new User(undefined, "adrian", password.hashPassword("password"), "azhangcc@gmail.com", 0, "bio goes here", Date.now()));
console.log(newUsr);
console.log(users.getUserByID(1));
*/