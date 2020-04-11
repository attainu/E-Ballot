const {  Router } = require('express');
const { votetoNominee } = require('../../controllers/apicontrollers/voteapicontroller');
const autheticate = require('../../middleware/autheticate');

const router = Router();

router.post('/vote/:electionid/:nomineeid', autheticate, votetoNominee);

module.exports = router;