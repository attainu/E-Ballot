const { Router } = require('express');
const { createElection, updateElection, deleteElection } = require('../../controllers/apicontrollers/electionapicontroller');
const autheticate = require('../../middleware/autheticate');

const router = Router();

router.post('/election', autheticate , createElection);

router.patch('/election/update/:electionid', autheticate, updateElection);

router.delete('/election/delete/:electionid', autheticate, deleteElection);

module.exports = router;