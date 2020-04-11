const { Router } = require('express');
const { fileinvitation }  =require('../../controllers/apicontrollers/emailapicontroller');
const autheticate = require('../../middleware/autheticate');

const router = Router();

router.post('/file/invitation/:electionid', autheticate, fileinvitation);


module.exports = router;
