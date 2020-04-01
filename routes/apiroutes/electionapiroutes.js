const { Router } = require('express');
const { createElection, updateElection, deleteElection, checkElection } = require('../../controllers/apicontrollers/electionapicontroller');
const autheticate = require('../../middleware/autheticate');

const router = Router();

router.post('/election', autheticate , createElection);

router.patch('/election/update/:electionid', autheticate, updateElection);

router.delete('/election/delete/:electionid', autheticate, deleteElection);

router.post('/electioncheck', (req, res)=>{
  console.log(req.body)
});

module.exports = router;