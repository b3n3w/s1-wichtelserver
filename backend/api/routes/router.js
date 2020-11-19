var express = require('express');
var router = express.Router();
const path = require('path');
var bodyParser = require('body-parser')
var nodemailer = require('../controller/mailController');



// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../frontend/html/index.html'));

});




router.use(express.json())
module.exports = router;