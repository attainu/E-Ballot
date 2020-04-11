const { Router } = require('express');
const autheticate = require('../../middleware/autheticate');

const router = Router();

const userapicontrollers = require('../../controllers/apicontrollers/userapicontroller');

router.post('/login', userapicontrollers.login);

router.post('/signup', userapicontrollers.signup);

router.post('/otppage', autheticate, userapicontrollers.checkOTP);

router.post('/user/login', userapicontrollers.userlogin);

router.post('/logout', autheticate, userapicontrollers.logout);

module.exports = router;