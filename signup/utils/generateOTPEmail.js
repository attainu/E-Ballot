const nodemailer = require('nodemailer');
const dotenv= require('dotenv');
dotenv.config;
const transportOptions = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  debug: 'development',
  auth:{
    user:'akshay28venkat1@gmail.com',
    pass:'sscdvkiqtvctgsee'
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
      from: 'akshay28venkat1@gmail.com',
      to: email,
      subject: 'OTP Send',
      text: `OTP to Conform ${OTP}`
    })
  }catch(err){
    console.log(err)
  }
}
module.exports = sendMailToUser;