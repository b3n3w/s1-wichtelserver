const User = require("../model/User");
var nodemailer = require('../controller/mailController');

exports.registerNewUser = async (req, res) => {

    try {
        let isUser = await User.find({ username: req.body.username });
        console.log(isUser);
        if (isUser.length >= 1) {
            return res.status(409).json({
                message: "username already in use"
            });
        }
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            street: req.body.street,
            zip: req.body.zip,
            city: req.body.city
        });


        let data = await user.save();
        const token = await user.generateAuthToken();
        nodemailer(req.body.email);
        res.status(201).json({ data, token });
    } catch (err) {
        res.status(400).json({ err: err });
    }
};

exports.loginUser = async (req, res) => {
    console.log("user "+req.body.username +"versucht sich anzumelden");
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.findByCredentials(username, password);
        if (!user) {
            return res
                .status(401)
                .json({ error: "Login failed! Check authentication credentials" });
        }
        const token = await user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (err) {
        res.status(400).json({ err: err });
    }
};
exports.getUserDetails = async (req, res) => {
    await res.json(req.userData);
};