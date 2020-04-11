const express = require('express');
const autheticate = require('../../middleware/autheticate');
const { updateProfile } = require('../../controllers/apicontrollers/profileapicontroller');
const router = express.Router();

router.post('/profile/update', autheticate, updateProfile);

module.exports = router;