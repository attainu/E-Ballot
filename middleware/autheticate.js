var User = require('../model/User');

module.exports = function(req, res, next){
  // change req.headers.userid to req.session.userid
  if(req.headers.userid){
    
    User
      .findById(req.headers.userid)
      .then(function(user){
        console.log('Autheticate Verified');
        req.user = user;
        next()
      })
      .catch(function(err){
        console.log("Autheticate :"+err.message);
        res.redirect('/login')
      })
  }
  else{
    res.redirect('/login')
  }
}