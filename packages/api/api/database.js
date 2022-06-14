const mongoose = require("mongoose");
mongoose.set('debug', true);
const Role = require("./models/role")


function dbconnect() {
    const db = process.env.MONGO_URI || "mongodb://mongo:27017/dev"
    //mongoose.set('debug', true);
    mongoose.connect(db);
    roleSetup();
    return mongoose.connection;
}

function dbclose() {
    return mongoose.disconnect();
}

function roleSetup() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "student"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'student' to roles collection");
            })
            new Role({
                name: "teacher"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'teacher' to roles collection");
            })
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            })
        }
    })
}

module.exports = { dbconnect, dbclose }