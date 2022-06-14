//require statements
const database = require("./database");
database.dbconnect().on("error", err => console.log("Connection to database failed."));
const api = require("./api");

require('dotenv').config();
