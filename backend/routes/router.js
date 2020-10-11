
const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');


router.post('/register' , ctrlUser.register);
router.post('/activateAccount', ctrlUser.activateAccount);

router.post('/authenticate', ctrlUser.authenticate);

router.put('/forgetPassword', ctrlUser.forgetPassword);
router.put('/resetPassword', ctrlUser.resetPassword);


//router.get('/verifyEmail', ctrlUser.verifyEmail); 




module.exports= router;