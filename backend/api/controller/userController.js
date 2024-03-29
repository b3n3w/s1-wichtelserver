const User = require("../model/User");
var nodemailer = require('../controller/mailController');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Group = require("../model/Group");
var path = require('path');
var fs = require('fs');
const { uploadImage } = require("./uploadController");


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
            city: req.body.city,
            likes: [],
            dislikes: []
        });

        let data = await user.save();
        const token = await user.generateAuthToken();
        nodemailer.sendAccountVerify(user);
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

exports.updateUser = async (req, res) => {

    let image = req.body.profileImg;
    if (image === undefined) {  
    }else{
        
        await uploadImage(image, "user", req.params.id)
    }

    let user = await User.findById(req.params.id).update({ likes: req.body.likes, dislikes: req.body.dislikes }).exec(function (err, user) {
        if (err) {
            console.log(err);
            res.status(409).send(err);
        }else{
            res.status(201).send("Nutzerinformationen erfolgreich gespeichert");
        }
    })
}


exports.getUserProfile = async (req, res) => {
    let userID = req.userData._id
    let user = await User.findById(userID);

    var imageAsBase64 = fs.readFileSync(path.join(__dirname + '..', '..', '..', 'uploads/' + userID + ".jpg"), 'base64');

    const data = {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        street: user.street,
        city: user.city,
        zip: user.zip,
        likes: user.likes,
        dislikes: user.dislikes,
        img: imageAsBase64
    }
    res.json(data)
}


exports.getUserDetails = async (req, res) => {
    await res.status(201).json(req.userData);
};

exports.setPersonalties = async (req, res) => {

    await User.findOneAndUpdate({ _id: req.body.id }, { "$set": { "likes": req.body.likes, "dislikes": req.body.dislikes } }).exec(function (err, user) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(user);
        }
    });
}





exports.getPersonalities = async (req, res) => {

    await User.findById(req.body.id).exec(function (err, user) {

        if (err) {
            res.status(403).send(err);
        }

        let personalities = [];
        personalities.push({ likes: user.likes });
        personalities.push({ dislikes: user.dislikes });

        res.json(personalities);
    })
};



exports.getUserGroups = async (req, res) => {

    let userID = req.userData._id;
    const data = [];

    Group.find({ groupmembers: userID }).exec(function (err, groups) {

        groups.forEach(group => {
            try {

                var imageAsBase64 = fs.readFileSync(path.join(__dirname + '..', '..', '..', 'uploads/' + group._id + ".jpg"), 'base64');
            } catch {
                imageAsBase64 = fs.readFileSync(path.join(__dirname + '..', '..', '..', 'uploads/group.jpg'), 'base64');
            }
            const temp = {
                groupId: group._id,
                groupname: group.groupname,
                groupdescription: group.groupdescription,
                members: group.groupmembers,
                groupstatus: group.wichtelStart,
                usercount: group.groupmembers.length,
                groupimage: imageAsBase64
            }
            data.push(temp);
        });
        res.json(data);
    });
}
exports.getUsernamebyID = async (req, res) => {

}