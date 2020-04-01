const { Router } = require('express');
const { viewBlog, electionViewBlog } = require('../../controllers/normalcontrollers/blognormalcontroller');
const autheticate = require('../../middleware/autheticate');

const router = Router();

router.get('/blog/view', autheticate, viewBlog);

router.get('/election/blog/view/:electionid', autheticate, electionViewBlog);

module.exports = router;