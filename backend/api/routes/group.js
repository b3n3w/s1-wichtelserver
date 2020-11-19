var express = require('express');
var router = express.Router();
var groupController = require('../controller/groupController');


router.post('/enterGroup', groupController.addUsertoGroup);
router.post('/createGroup',groupController.createGroup);



router.use(express.json())
module.exports = router;