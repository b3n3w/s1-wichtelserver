const upload = require("../middleware/fileupload");
var imgModel = require('../model/Image');
var fs = require('fs');
var path = require('path');
const base64Img = require('base64-img');



exports.uploadImage = async (req, res) => {
    const  image  = req.body.image;
 
    base64Img.img(image, __dirname + '../../../uploads/', req.body.uID, function (err, filepath) {
        const pathArr = filepath.split('/')
        const fileName = req.body.uID;
        console.log(pathArr);
        console.log(fileName);

        res.status(200).json({
            success: true
           
        })
    });
};

