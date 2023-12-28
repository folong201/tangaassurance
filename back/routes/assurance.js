const express = require('express');
const router = express.Router();
const assuranceController = require('./../controller/assuranceController');
const { isAuth, isAdmin } = require('../middlewares/index.js')


router.get('/',isAdmin, assuranceController.getAllAssurances);
router.post('/',isAdmin, assuranceController.createAssurance);
router.get('/user/:id', assuranceController.getAssuranceByUser);
router.put('/update/:id',isAdmin, assuranceController.updateAssurance);


module.exports = router;