var express = require('express');
var router = express.Router();
const path = require('path');
var bodyParser = require('body-parser')
var nodemailer = require('../controller/mailController');




router.use(express.json())
module.exports = router;