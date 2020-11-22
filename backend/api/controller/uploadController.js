const upload = require("../middleware/fileupload");
var imgModel = require('../model/Image');
var fs = require('fs');
var path = require('path');
const base64Img = require('base64-img');
const User = require("../model/User");
var resizebase64 = require('resize-base64')
var sharp = require('sharp')



exports.uploadImage = async (req, res) => {
   var image = req.body.image;


    image = await resizeBase64(image);

    base64Img.img(image, __dirname + '../../../uploads/', req.body.uID, function (err, filepath) {
        const pathArr = filepath.split('/')
        const fileName = req.body.uID;
        console.log(pathArr);
        console.log(fileName);

        updateUser(req.body.uID);
        res.status(200).json({
            success: true

        })
    });
};

async function resizeBase64  ( base64Image, maxHeight = 640, maxWidth = 640 ) {
    const destructImage = base64Image.split(";");
    const mimType = destructImage[0].split(":")[1];
    const imageData = destructImage[1].split(",")[1];

    try {
        let resizedImage = Buffer.from(imageData, "base64")
        resizedImage = await sharp(resizedImage).resize(maxHeight, maxWidth).toBuffer()

        return `data:${mimType};base64,${resizedImage.toString("base64")}`
    } catch (error) {
        throwError({ error })
    }
};


async function updateUser(userId) {
    let doc = await User.findOneAndUpdate({ _id: userId }, { profileImage: true })
}