const { Router } = require('express');
const { nomineeinvitation, voterinvitation }  =require('../../controllers/apicontrollers/emailapicontroller');
const autheticate  =require('../../middleware/autheticate');

const router = Router();

router.post('/nomineeinvitation/:electionid', autheticate,  nomineeinvitation);

router.post('/voterinvitation/:electionid',autheticate, voterinvitation );

module.exports = router;
