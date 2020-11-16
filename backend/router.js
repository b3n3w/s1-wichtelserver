var express = require('express');
var router = express.Router();
const path = require('path');
var userroute = require('./user');
var skillroute = require('./skill');
var bodyParser = require('body-parser')
const auth = require("../middleware/auth");
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../view/login.html'));
});

router.get('/logout', function (req, res) {
    try {
        router.post('/logout', userroute.logout(req,res));
    } catch (err) {

    }
});

router.get('/profile', function (req, res) {
    res.sendFile(path.join(__dirname + '/../view/profile.html'));
});

router.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname + '/../view/login.html'));
});

router.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname + '/../view/login.html'));
});

router.get('/profile', function (req, res) {
    res.sendFile(path.join(__dirname + '/profile.html'));
});

router.use(express.json())

//route to handle user registration / login
router.post('/register', userroute.register);
router.post('/login', userroute.login);
router.post('/logout', userroute.logout);
router.post('/profile',function(req, res){
    res.sendFile(path.join(__dirname + '/profile.html'));
})


//route to skill add / get skils
router.post('/api/skill',skillroute.add);
router.get('/')

/**
 * @method - POST
 * @description - Get LoggedIn User
 * @param - /user/me
 */

router.get("/me", auth, async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });




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