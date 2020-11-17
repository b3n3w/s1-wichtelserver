var express = require('express');
var router = express.Router();
const path = require('path');
var bodyParser = require('body-parser')
var nodemailer = require('./nodemailer');


// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../frontend/html/index.html'));

});

router.post('/api/testmail', function (req, res) {

nodemailer(req,res);
 
});

router.use(express.json())

router.get('/')


// GET for logout logout
router.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

module.exports = router;