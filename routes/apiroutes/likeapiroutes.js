const { Router } = require('express');
const { likeBlog } = require('../../controllers/apicontrollers/likeapicontroller');
const autheticate = require('../../middleware/autheticate');

const router = Router();

router.post('/blog/like/:blogid', likeBlog)

module.exports = router