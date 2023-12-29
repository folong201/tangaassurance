const express = require("express")
const router = express.Router()
const authroute = require('./auth.js')
const userRoute  =require('./user.js')
const assuranceRoute = require('./assurance.js')
const messageRoute = require('./message.js')
const {isAuth,isAdmin} = require('../middlewares/index.js')


router.use('/auth',authroute)
router.use('/users',isAuth, userRoute)
router.use('/assurances',isAuth, assuranceRoute)
router.use('/messages',isAuth,messageRoute)

module.exports = router
// 