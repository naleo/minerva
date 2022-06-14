const User = require("../models/user");
const Role = require("../models/role");

addRolesToReq = async (req, res, next) => {
        try {
            const user = await User.findById(req.userId);
            var userRoles = await Role.find({
                _id: { $in: user.roles },
            });
            userRoles = userRoles.map((role) => {return role.name});
            req.roles = userRoles;
            next();
        } catch (err) {
            res.status(500).send({ message: err });
        }
    }


const authorization = {
    addRolesToReq
};

module.exports = authorization;