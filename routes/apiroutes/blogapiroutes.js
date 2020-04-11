const { Router } = require('express');
const { createBlog, updateblog, deteletBlog } = require('../../controllers/apicontrollers/blogapicontroller');
const autheticate = require('../../middleware/autheticate');

const router = Router();

router.post('/blog/createblog/:electionid', autheticate,createBlog);

router.patch('/blog/update/:blogid', autheticate, updateblog);

router.delete('/blog/delete/:electionid/:blogid', autheticate, deteletBlog);

module.exports = router;