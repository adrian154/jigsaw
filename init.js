// Run to set up dev environment
// Destroys tables if they exist!
// This file also serves as a sort of database reference

// NOTES:
// resourceType:
//  0 = challenge
//  1 = solution
//  2 = comment

const config = require("./config.js");
const sqlite = require("better-sqlite3");
const db = new sqlite(config.DATABASE_FILE);

db.exec(`
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS challenges;
DROP TABLE IF EXISTS solutions;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS comments;

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT,
    passwordHash TEXT,
    email TEXT,
    xp INTEGER,
    bio TEXT,
    joinDate INTEGER
);

CREATE TABLE challenges (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT,
    createDate INTEGER,
    creatorID INTEGER,
    testCasesJSON TEXT
);

CREATE TABLE solutions (
    id INTEGER PRIMARY KEY,
    code TEXT,
    createDate INTEGER,
    creatorID INTEGER,
    challengeID INTEGER
);

CREATE TABLE sessions (
    IP TEXT,
    key TEXT,
    userID INTEGER
);

CREATE TABLE votes (
    userID INTEGER,
    resourceType INTEGER,
    resourceID INTEGER,
    vote INTEGER,
    UNIQUE(userID, resourceType, resourceID)
);

CREATE TABLE comments (
    id INTEGER PRIMARY KEY,
    body TEXT,
    createDate INTEGER,
    creatorID INTEGER,
    resouceType INTEGER,
    resouceID INTEGER
);

`);