const { Router } = require('express');
const { nomineefileupload,voterfileupload } = require('../../controllers/apicontrollers/fileapicontroller');
const autheticate = require('../../middleware/autheticate');
const upload = require('../../files/multer');

const router = Router();
    
//fileUpload is the name attribute of the File Upload HTML
router.post('/nominees/:electionid', autheticate,upload.single('fileUpload'), nomineefileupload);

router.post('/voter/:electionid', autheticate,upload.single('voterfileUpload'), voterfileupload);

module.exports = router