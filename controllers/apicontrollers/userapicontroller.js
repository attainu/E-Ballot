const User = require('../../model/User');
const People = require('../../model/People');
const sendMail = require('../../utils/generateOTPEmail');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const generateOTPEmail = require('../../utils/generateOTPEmail');
const dotenv= require('dotenv');
dotenv.config;
const privateKey = process.env.PRIVATE_KEY

module.exports = {
  async login(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    // Check the email and Password
    const user = await User.findByEmailAndPassword(email, password)
    // Create the token and Store in the DB
    jwt.sign({id: user._id}, privateKey, async (err, token)=>{
      const users = await User.update({email: email}, { $set: { token: token }})
      res.json({ token: token}).status(200)
    })
  },

  async signup(req, res){
    try{
      var checkMail = await User.findOne({email: req.body.email})
      console.log("Check Email: "+checkMail)
      if(checkMail){
        let error = new Error('Email is Already Registered');
        error.statusCode = 401;
        throw error
      }
      // Check the Phone number should be equal to 10
      var checknumber = req.body.ph_no.split("")
      if(checknumber.length !== 10){
        let error = new Error('Phone Number should be equal to length 10');
        error.statusCode = 401;
        throw error
      }
      var user = new User({ ...req.body });
      var email = user.email;
      // Create a random 6 digit number and store in the DB for thr OTP 
      user.emailOTP = Math.floor(100000 + Math.random() * 900000);
      user.save()
      // Send the mail to the respective user
      await sendMail(email, user.emailOTP);
      // Create the token for the user to access
      jwt.sign({id: user._id}, privateKey, async (err, token)=>{
        
        var users = await User.update({_id: user._id}, { $set: { token: token }})
        res.json({success: "User data is added",token: token}).status(200) 
      });
    }
    catch(err){
      if(!err.statusCode){
        err.statusCode = 500;
      }
      res.status(err.statusCode).send({err: err.message, status: err.statusCode})
    }
  },

  async checkOTP(req, res){
    try{
      var user = req.user;
      var otp = req.body.otp;
      if(!otp){
        let error = new Error('Enter the OTP');
        error.statusCode = 400;
        throw error
      }
      // Check the user is in the User and People DB and get the OTP
      var users = await User.findOne({_id: user._id})
      if(users !== null){
        var checkOTP = users.emailOTP
        var isotp = "users"
      }
      var peoples = await People.findOne({_id: user._id})
      if(peoples !== null){
        var checkOTP = peoples.emailOTP
        var isotp = "people"
      }
      if(!checkOTP){
        let error = new Error('OTP is already Verified');
        error.statusCode = 400;
        throw error
      }
      // CHeck the USer OTP and DB OTP is same or not
      if(otp == checkOTP){
        // Change the OTP into null once the OTP is correct
        if(isotp === "users"){
          await User.updateOne({_id: user._id}, { emailOTP: null})
        }
        else if( isotp === "people"){
          await People.updateOne({_id: user._id}, { emailOTP: null })
        }
        res.json({Successmessage: "OTP is Correct"}).status(200)
      }
      else{
        let error = new Error('OTP is invalid');
        error.statusCode = 500;
        throw error
      }
    }catch(err){
      res.json({message:err.message, status: err.statusCode}).status(err.statusCode)
    }
  },

  async userlogin(req, res){
    try {
      var email = req.body.email;
      var password = req.body.password;
      
      const user = await People.findByEmailAndPassword(email, password)
      const checkFirst = await People.find({email: email, isFirst: true})
      
      if(checkFirst !== null){
        await generateOTPEmail(email, checkFirst[0].emailOTP) 
      }
      
      jwt.sign({id: user._id}, privateKey, async (err, token)=>{
        const users = await People.update({email: email}, { $set: { token: token }})
        res.json({token: token}).status(200)
      });

    } catch (err) {
      res.json({error: err.message}).status(500)
    }
  },

  async logout(req, res){
    try {
      var user = req.user;
      // console.log(user)
      const users = await User.findById({_id: user._id});
      // console.log("User: "+ users)
      if(users !== null)
      {
        await User.updateOne(
          {_id: user._id},
          { $set: { token : null } }
        )
      }
      const people = await People.findById({_id: user._id});
      // console.log("People: "+people)
      if(people !== null){
        await People.updateOne(
          {_id: user._id},
          { $set: { token: null } }
        )
      }

      res.send('Logout Sucessfully')
    } catch (err) {
      res.send(err.message)
    }
  },

}