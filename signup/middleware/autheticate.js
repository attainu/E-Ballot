var User = require('../model/User');

module.exports = function(req, res, next){
  if(req.session.userid){
    User
      .findById(req.session.userid)
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