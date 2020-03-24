const User = require('../../model/User');
const sendMail = require('../../utils/generateOTPEmail');
const Logdetails = require('../../model/LoggingDetails');
const ip = require('ip');

module.exports = {
  async login(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var logdetails = new Logdetails({});
    User
      .findByEmailAndPassword(email, password)
      .then( function(user){
        console.log('Hai')
        req.session.userid = user._id;
        logdetails.ip = ip.address();
        logdetails.user = user._id;
        logdetails.save();
        res.redirect('/');
      })
      .catch( function(err){
        res.send(err);
      })
  },

  async signup(req, res){
    var user = new User({ ...req.body });
    user.emailOTP = Math.floor(100000 + Math.random() * 900000);
    try{
      user.save()
      console.log(user.Company_email);
      await sendMail(user.Company_email, user.emailOTP);
      req.session.userid = user._id;
      res.redirect(`/otppage/${user._id}`)
    }
    catch(err){
      console.log(err)
    }
  },

  async checkOTP(req, res){
    try{
      // console.log("5e786222e8da701e24eac272")
      var user = await User.findOne({_id: req.params.userid})
      var otp = req.body.num1+ req.body.num2+ req.body.num3+ req.body.num4+ req.body.num5+ req.body.num6;
      
      if(otp == user.emailOTP){
        await User.updateOne({_id: req.params.userid}, { emailOTP: null})
        // user.emailOTP = null;
        user.save();
      }
      else{
        console.log('No ')
      }
    }catch(err){
      console.log(err);
    }
  }
}