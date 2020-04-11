var path = require('path');

// adding the filename with the date 
function injectdata(filename){
  var extname = path.extname(filename);
  var newFileName = filename.replace(extname, '')+"-"+Date.now()+extname;
  return newFileName;
}

module.exports =injectdata