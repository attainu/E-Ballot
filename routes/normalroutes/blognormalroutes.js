const { Router } = require('express');
const { viewBlog, electionViewBlog } = require('../../controllers/normalcontrollers/blognormalcontroller');
const autheticate = require('../../middleware/autheticate');

const router = Router();

router.get('/blog/:blogid',  viewBlog);

router.get('/election/blog/:electionid', electionViewBlog);

module.exports = router;