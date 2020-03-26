const { Router } = require('express');
const { nomineesfileupload, voterfileupload } = require('../../controllers/apicontrollers/fileapicontroller');
const autheticate = require('../../middleware/autheticate');
const upload = require('../../files/multer');

const router = Router();
    
//fileUpload is the name attribute of the File Upload HTML
router.post('/nominees', autheticate,upload.single('fileUpload'), nomineesfileupload);

router.post('/voter', autheticate,upload.single('voterfileUpload'), voterfileupload)
module.exports = router