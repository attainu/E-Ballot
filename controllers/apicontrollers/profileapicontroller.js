const Profile = require('../../model/Profile');
const People = require('../../model/People');
const bcrypt = require('bcryptjs');

module.exports = {
  async updateProfile(req, res){
    try {
      var user = req.user;
      
      var checkType = await People.findOne({_id: user._id, type: "nominee"});
      if(!checkType){
        let error = new Error('Nominee Only able to create the Profile!!!');
        error.statusCode = 401;
        throw error
      }
      // Check the OTP verification is completed or not
      if(user.emailOTP){
        let error = new Error('You account is not verified. Kindly Verify your account');
        error.statusCode = 401;
        throw error
      }
      // Check for changing the email or not
      if(user.email !== req.body.email){
        let error = new Error('Restricted to change the email address');
        error.statusCode = 401;
        throw error
      }
      // Hashning the password
      const passwordHasing = await bcrypt.hash(req.body.password, 10)
      req.body.password = passwordHasing;
      await Profile.updateOne(
        {userid: user._id},
        { ... req.body },
        { new: true }
      );
      await People.updateOne(
        { _id: user._id },
        { name: req.body.name, ph_no: req.body.ph_no, password: req.body.password },
        { new: true }
      )
      return res.json({message: "Your deatils are Updated Successfully!!!!!"}).status(200)
    } catch (err) {
      if(!err.statusCode){
        err.statusCode = 500;
      }
      res.json({message: err.message})
    }
  }
}