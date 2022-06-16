const express = require("express");
const router = express.Router();
const assignmentRoutes = require("./routes/assignment.routes")
const userRoutes = require("./routes/user.routes")
const middlewares = require("./middlewares/middlewares")
const authRoutes = require("./routes/auth.routes");

router.use("/", authRoutes);
router.use([middlewares.authJwt.verifyToken, middlewares.authorization.addRolesToReq]);
router.use("/assignments", assignmentRoutes);
router.use("/users", userRoutes);


module.exports = router;
