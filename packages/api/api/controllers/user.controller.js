const User = require("../models/user")

exports.updateUser = async (req, res) => {
    try {
        if(req.userId == req.params.id || req.roles.includes("admin")) {
            const user = await User.findById(req.params.id).select('+password');
            if (req.body.firstName) {
                user.firstName = req.body.firstName;
            }
            if (req.body.lastname) {
                user.lastName = req.body.lastName;
            }
            if (req.body.birthDate) {
                user.birthDate= req.body.birthDate;
            }
            if (req.body.email) {
                user.email = req.body.email;
            }
            if (req.body.gradeLevel) {
                user.gradeLevel = req.body.gradeLevel;
            }
            if (req.body.password) {
                const passwordMatches = await user.comparePassword(req.body.currentPassword);
                if (passwordMatches) {
                    user.password = req.body.password;
                    await user.save();
                    res.status(200);
                    res.send(user);
                } else {
                    res.status(403);
                    res.send( { message: "Invalid Password!"});
                }
            } else {
                await user.save();
                res.status(200);
                res.send(user);
            }
        } else {
            res.status(403);
            res.send({ message: "Unauthorized" });
        }
    } catch {
        res.status(500);
        res.send({ message: "Internal Server Error" });
    }
}

exports.getAllUsers = async (req, res) => {
    if(req.roles.includes("admin") || req.roles.includes("teacher")) {
        const users = await User.find();
        res.status(200);
        res.send(users);
    } else {
        res.status(403);
        res.send({ message: "Unauthorized" });
    }
}

exports.getUser = async (req, res) => {
    try {
        if(req.roles.includes("admin") || req.roles.includes("teacher")) {
            const user = await User.findById(req.params.id);
            delete user.password;
            res.status(200);
            res.send(user);
        } else {
            if (req.userId == req.params.id) {
                const user = await User.findById(req.params.id);
                delete user.password;
                res.status(200);
                res.send(user);
            }
        }
    } catch {
        res.status(404);
        res.send({ error: "User does not exist!" });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        if (req.roles.includes("admin")) {
            if (req.userId == req.params.id) {
                res.status(403);
                res.send({ message: "Administrators cannot delete themselves." });
            } else {
                await User.deleteOne({_id: req.params.id });
                res.status(204).send();
            }
        } else {
            res.status(403);
            res.send({ message: "Unauthorized" })
        }
    } catch {
        res.status(404);
        res.send({ error: "User does not exist!" });
    }
}