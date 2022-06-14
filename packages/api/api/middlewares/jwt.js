const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user");

verifyToken = (req, res, next) => {
    if (!req.session.token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(req.session.token, config.secrets.jwt, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};


const authJwt = {
    verifyToken
};

module.exports = authJwt;