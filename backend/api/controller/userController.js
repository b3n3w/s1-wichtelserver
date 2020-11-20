const User = require("../model/User");
var nodemailer = require('../controller/mailController');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Group = require("../model/Group");


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
        nodemailer(user);
        res.status(201).json({ data, token });

    } catch (err) {
        res.status(400).json({ err: err });
    }
};

exports.loginUser = async (req, res) => {
    console.log("user " + req.body.username + " versucht sich anzumelden");
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.findByCredentials(username, password);
        if (!user) {
            return res
                .status(401)
                .json({ error: "Login failed! Check authentication credentials" });
        }
        if (!user.active) {
            return res.status(402).json({ error: "Login failed! User not activated yet" });
        }
        const token = await user.generateAuthToken();
        const firstLogin = user.firstLogin;
        res.status(201).json({ user, token, firstLogin });

        if (user.firstLogin) {
            user.firstLogin = false;
            user.save();
        }
    } catch (err) {
        res.status(400).json({ err: err });
    }
};

exports.changeUserPasswort = async (req, res) => {



}
exports.verifyUser = async (req, res) => {

    token = req.query.id;
    if (token) {
        try {
            jwt.verify(token, process.env.JWT_VERIFY_KEY, (e, decoded) => {
                if (e) {
                    console.log(e)
                    return res.sendStatus(403)
                } else {
                    id = decoded.id;
                    console.log(id);
                    const user = User.findById(id, function (err, user) {
                        if (!user) {
                            throw new Error({ error: "User for verification not found" });
                        } else {
                            user.active = true;
                            user.save();
                            res.status(201).send('Accountaktivierung erfolgreich ! Du kannst kannst dich nun einloggen <3')
                        }
                    })
                }
            });
        } catch (err) {
            console.log(err)
            return res.sendStatus(403)
        }
    } else {
        return res.sendStatus(403)
    }
}


exports.getUserProfile = async (req, res) => {

    let user = await User.findById(req.userData._id);
    const data = {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        street: user.street,
        city: user.city,
        zip: user.zip,
    }
    res.json(data)
}
exports.getUserDetails = async (req, res) => {
    await res.json(req.userData);
};


exports.getUserGroups = async (req, res) => {

    let userID = req.userData._id;
    console.log(userID);

    const data = [];
    Group.find({ groupmembers: userID }).exec(function (err, groups) {

        groups.forEach(group => {
            const temp = {
                groupname: group.groupname,
                groupdescription: group.groupdescription,
                members: group.groupmembers
            }
            data.push(temp);
        });
        res.json(data);
    });
}
exports.getUsername