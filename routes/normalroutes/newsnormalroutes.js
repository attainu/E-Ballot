const { Router } = require('express');
const { electionNews, viewNews } = require('../../controllers/normalcontrollers/newsnormalcontroller');

const router = Router();

router.get('/news/election/:electionid', electionNews);

router.get('/news/:newsid', viewNews);

module.exports = router;