var mongoose = require('mongoose');
var dotenv = require('dotenv');
dotenv.config();
mongoose
  .connect(process.env.MONGO_CONNECT, {
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