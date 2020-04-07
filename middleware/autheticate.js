const User = require('../model/User');
const People = require('../model/People');

module.exports = async (req, res, next)=>{
  const authHeader = req.header('Authorization')
  // Check the Headers passed or not
  if(!authHeader){
    const error = new Error('Not Autheticated.');
    error.statusCode = 401;
    throw error;
  }
  // Check for the token is related to the User db
  const user = await User.findOne({token: authHeader});
  if(user){
    req.user = user;
    next();
  }
  else if(!user){
    // Check for the token is related to the People db
    const people = await People.findOne({token: authHeader});
    
    if(people){
      req.user = people;
      next();
    }
    else if(!people){
      res.send("Authetication Denied").status(500)
    }
  }
}