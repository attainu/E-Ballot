const { Router } = require('express');

const router = Router();

const userapicontrollers = require('../../controllers/apicontrollers/userapicontroller');

router.post('/login', userapicontrollers.login);

router.post('/signup', userapicontrollers.signup);

router.post('/otppage/:userid', userapicontrollers.checkOTP);


module.exports = router;