const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var userSchema = new mongoose.Schema({
    //_id is added by default by mongoose
    schemaVersion: {type: Number, default: 1 },
    firstName: String,
    lastName: String,
    birthDate: Date,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    gradeLevel: Number,
    password: { type: String, required: true, select: false },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role", default: []}]
})

userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        })
    })
})

userSchema.methods.comparePassword = function(possiblePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(possiblePassword, this.password, function(err, isMatch) {
            if (err) {
                reject(err);
            } else {
                resolve(isMatch);
            }
        })
    })
}

module.exports = mongoose.model("User", userSchema);