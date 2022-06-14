const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller")
const middlewares = require("../middlewares/middlewares")

router.patch("/:id", controller.updateUser) //update user (students & teacher can update self, admin can update any)

router.get("/:id", controller.getUser) //get single user (current user get self, teacher get students, admin get any)

router.get("/", controller.getAllUsers) //get all users (teachers & admins)

router.delete("/:id", controller.deleteUser) //delete user (admin only)


module.exports = router;
