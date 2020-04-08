const { Router } = require('express');
const { nomineefileupload } = require('../../controllers/apicontrollers/fileapicontroller');
const autheticate = require('../../middleware/autheticate');
const upload = require('../../files/multer');

const router = Router();
    
//fileUpload is the name attribute of the File Upload HTML
router.post('/file/:electionid', autheticate,upload.single('fileUpload'), nomineefileupload);


module.exports = router