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
    active: {
        type: Boolean,
        default: false
    },
    firstLogin: {
        type: Boolean,
        default: true
    },
    likes: [{
        type: String,
    }],
    dislikes: [{
        type: String,
    }],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    profileImage: {
        type: Boolean
    },
});


UserSchema.pre(
    'save',
    async function (next) {
        const user = this;
        if (user.isModified("password")) {

            const hash = await bcrypt.hash(this.password, 10);
            user.password = hash;
           
        }
        next();
    }
);

//this function generates an auth token for the user
UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign(
        { _id: user._id, name: user.username },
        process.env.JWT_SECRET_KEY
    );
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};



UserSchema.methods.generateChatToken = async function (chatID) {
    const user = this;
    const chatToken = jwt.sign(
        {
            _id: chatID,
        }
    )

}

//this method search for a user by username and password.
UserSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error({ error: "Invalid login details" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error({ error: "Invalid login details" });
    }
    return user;
};


const User = mongoose.model("User", UserSchema);
module.exports = User;