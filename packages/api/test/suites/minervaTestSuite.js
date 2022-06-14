const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongooseConnect = require("../../api/database");
const app = require("../../api/api");
const should = chai.should();
chai.use(chaiHttp);

module.exports = (testDescription, testsCallBack) => {
    describe(testDescription, () => {
        
        /* COULD BE USEFUL
        const signUpThenLogIn = (credentials, testCallBack) => {
            chai
              .request(app)
              .post("/auth/Thing/signup")
              .send({
                name: "Wizard",
                ...credentials,
              })
              .set("Content-Type", "application/json")
              .set("Accept", "application/json")
              .end((err, res) => {
                chai
                  .request(app)
                  .post("/auth/Thing/login")
                  .send(credentials)
                  .set("Content-Type", "application/json")
                  .set("Accept", "application/json")
                  .end((err, res) => {
                    should.not.exist(err)
                    res.should.have.status(200)
                    res.body.token.should.include("Bearer ")
                    testCallBack(res.body.token)
                  })
              })
          }
        */
            
        const clearDB = () => {
            for (var i in mongoose.connection.collections) {
                mongoose.connection.collections[i].deleteMany(() => {});
            }
        }
        
        before(async () => {
            //before stuff like setting up the app and the mongoose server.
            let mongoServer = await MongoMemoryServer.create();
            const mongoURI = mongoServer.getUri();
            process.env.MONGO_URI = mongoURI
            await mongooseConnect.dbconnect().on("error", err => console.log(err));
        })
        
        beforeEach(async () => {
            //beforeEach stuff clearing out the db.
            await clearDB();
        })
        
        after(async () => {
            //after stuff like shutting down the app and the mongoose server.
            await clearDB();
            await mongooseConnect.dbclose();
        })
        
        testsCallBack();
    })
}
