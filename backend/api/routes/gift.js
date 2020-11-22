var express = require('express');
var router = express.Router();
var giftController = require('../controller/giftController');

router.post('/startWichteln', giftController.startWichteln);

router.use(express.json())
module.exports = router;