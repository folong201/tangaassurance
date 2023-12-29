const express = require('express');
const router = express.Router();
const messageController = require('./../controller/messageController.js');
const { isAuth, isAdmin } = require('../middlewares/index.js')


router.get('/', isAdmin, messageController.getAllMessages);
router.post('/', isAdmin, messageController.createMessage);
router.get('/update/:id', isAdmin, messageController.updateMessageById);


module.exports = router;