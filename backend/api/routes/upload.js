var express = require('express');
var router = express.Router();
var uploadController = require("../controller/uploadController");

router.post("/", uploadController.uploadImage)


router.use(express.json())
module.exports = router;