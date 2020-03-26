var multer = require('multer');
var injectDate = require('./injectdate');

// Custom config for file upload
var upload = multer({
  storage: multer.diskStorage({
    destination:'uploads/',
    filename: (_, file, cb)=>{
      cb(null, injectDate(file.originalname))
    }
  }),
  fileFilter: (_, file, cb)=>{
    if(file.mimetype === "application/octet-stream" ){
      cb(null, true)
    }else{
      var newError = new Error('File Type is incorrect');
      newError.name = "MulterError";
      cb(newError, false)
    }
  }
})

module.exports = upload