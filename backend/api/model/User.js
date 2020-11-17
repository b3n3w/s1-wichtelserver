const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Bitte gebe einen Nutzernamen ein"]
    },
    password: {
        type: String,
        required: true,
        required: [true, "Bitte gebe ein Passwort ein"]
    },
    firstname: {
        type: String
    },
   lastname: {
        type: String
    },
    street: {
        type: String
    },
    zip: {
        type: Number
    },
    city: {
        type: String
    },
    email: {
        type: String
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});


UserSchema.pre(
    'save',
    async function (next) {
        const user = this;
        if (user.isModified("password")) {
            const hash = await bcrypt.hash(this.password, 10);
        }
        next();
    }
);

//this function generates an auth token for the user
UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign(
        { _id: user._id, name: user.username},
        "LjZWkQK%a6qE5%HE!MVZu5wrkzRgt"
    );
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

//this method search for a user by email and password.
UserSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
        throw new Error({ error: "Invalid login details" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error({ error: "Invalid login details" });
    }
    return user;
};

module.exports = mongoose.model('users', UserSchema);
