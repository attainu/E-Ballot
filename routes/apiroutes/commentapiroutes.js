const { Router } = require('express');
const { createComment, deleteComment } = require('../../controllers/apicontrollers/commentapicontroller');

const router = Router();

router.post('/blog/comment/:blogid', createComment);

router.delete('/blog/:blogid/delete/comment/:commentid', deleteComment);

module.exports = router;