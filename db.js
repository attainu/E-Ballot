var mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/Eballot', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(function(){
    console.log("DataBase Connected Sucessfully")
  })
  .catch( function(err){
    console.log(err.message)
  })