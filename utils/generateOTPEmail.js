const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transportOptions = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  debug: 'development',
  auth:{
    user:process.env.EMAIL,
    pass:process.env.PASSWORD
  }
};

const mailTransport =  nodemailer.createTransport(transportOptions);
  
const sendMailToUser = async(email, OTP)=>{
  try{
    // console.log("Email: "+process.env.EMAIL)
    // console.log("Password: "+process.env.PASSWORD)
    // console.log(email)
    await mailTransport.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'OTP Send',
      text: `OTP to Conform ${OTP}`
    })
  }catch(err){
    console.log(err)
  }
}
module.exports = sendMailToUser;