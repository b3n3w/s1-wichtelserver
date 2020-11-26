var express = require('express');
var router = express.Router();
var groupController = require('../controller/groupController')
var userController = require('../controller/userController');

const auth = require("../../config/auth");


router.get("/me", auth, userController.getUserProfile);
router.get('/verify', userController.verifyUser);

router.get('/groups', auth, userController.getUserGroups);

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.put("/:id", userController.updateUser);



router.use(express.json())
module.exports = router;