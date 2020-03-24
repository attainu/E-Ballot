const { Router } = require('express');
const autheticate = require('../../middleware/autheticate');
const router = Router();

const usernormalcontroller = require('../../controllers/normalcontrollers/usernormalcontroller');

// router.get('/',)

router.get('/login', usernormalcontroller.renderloginpage);

router.get('/signup', usernormalcontroller.rendersignuppage);

router.get('/otppage/:userid',autheticate, usernormalcontroller.renderotppage);

router.get('/', (req, res)=>{
  res.send('Hai')
})
module.exports = router;


