const { Router } = require('express');
const { createNews, updateNews, deleteNews }  = require('../../controllers/apicontrollers/newsapicontroller');
const autheticate = require('../../middleware/autheticate');

const router = Router();

router.post('/news/createnews/:electionid', autheticate, createNews);

router.patch('/news/updatenews/:newsid', autheticate, updateNews);

router.delete('/news/deletenews/:newsid', autheticate, deleteNews);

module.exports = router;