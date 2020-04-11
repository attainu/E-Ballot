const { Router } = require('express');
const { createComment, deleteComment } = require('../../controllers/apicontrollers/commentapicontroller');
const autheticate = require('../../middleware/autheticate');

const router = Router();

router.post('/blog/comment/:blogid',autheticate, createComment);

router.delete('/blog/:blogid/delete/comment/:commentid', autheticate, deleteComment);

module.exports = router;