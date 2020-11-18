var express = require('express');
var router = express.Router();
const path = require('path');
var bodyParser = require('body-parser')
var nodemailer = require('../controller/mailController');
var userController = require('../controller/userController');
const auth = require("../../config/auth");



// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../frontend/html/index.html'));

});


router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/me", auth, userController.getUserDetails);
router.get('/verify', userController.verifyUser);

router.post('/api/testmail', function (req, res) {
    nodemailer(req, res);
});




router.use(express.json())
module.exports = router;