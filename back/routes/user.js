const express = require("express")
const router = express.Router()
const userController = require("./../controller/userController.js")
const { isAuth, isAdmin } = require('../middlewares/index.js')

router.get('/',isAdmin, userController.getAllUsers) // Get all users
router.get('/:id', userController.getUserById) // Get one user
router.put('/:id', userController.updateUser) // Get one user
router.post('/', userController.createUser) // Create a user


module.exports = router


