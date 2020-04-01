const { Router } = require('express');
const autheticate = require('../../middleware/autheticate');
const { resultElection } = require('../../controllers/normalcontrollers/electionnormalcontroller');

const router = Router();

router.get('/election/result', autheticate, resultElection)

module.exports = router;