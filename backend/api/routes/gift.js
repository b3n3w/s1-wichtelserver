var express = require('express');
var router = express.Router();
var giftController = require('../controller/giftController');

router.post('/startWichteln', giftController.startWichteln);
router.get('/getPartner', giftController.getGiftPartner);

router.use(express.json())
module.exports = router;