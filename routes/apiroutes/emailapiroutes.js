const { Router } = require('express');
const { nomineeinvitation, voterinvitation }  =require('../../controllers/apicontrollers/emailapicontroller');
const router = Router();

router.post('/nomineeinvitation',  nomineeinvitation);

router.post('/voterinvitation', voterinvitation );

module.exports = router;
