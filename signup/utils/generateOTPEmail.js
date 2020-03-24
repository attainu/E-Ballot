const nodemailer = require('nodemailer');
const dotenv= require('dotenv');
dotenv.config;
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
mailTransport
  .verify()
  .then(res => { console.log(res)})
  .catch( err => { console.log(err)})
  
const sendMailToUser = async(email, OTP)=>{
  try{
    console.log(email)
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