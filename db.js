var mongoose = require('mongoose');

mongoose
  .connect("mongodb+srv://eballot_system:nsU9vl4mWdq3ziVw@e-ballot-jlsun.mongodb.net/Eballot?retryWrites=true&w=majority", {
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