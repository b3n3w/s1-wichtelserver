var express = require('express');
var router = express.Router();
var chatController = require('../controller/chatController');
const auth = require("../../config/auth");

router.post('/:id', auth, chatController.openChat);
