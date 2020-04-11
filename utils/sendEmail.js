const nodemailer = require('nodemailer');

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

module.exports = {
  async sendFileInvitation(email, password,date){
    try{
      console.log(email)
      await mailTransport.sendMail({
        from: 'akshay28venkat1@gmail.com',
        to: email,
        subject: `Election is Going to Start ${date}`,
        text: `Crenditals are shared to login to vote.
        UserName: ${email}
        Password: ${password}
        Login To change the password
                All the Best.
                For More Informartion contact your Election Comission`
      })
    }catch(err){
      res.json({message: err.message})
    }
  },

  async sendBlogMail(email, name, title){
    try{
      console.log(email)
      await mailTransport.sendMail({
        from: 'akshay28venkat1@gmail.com',
        to: email,
        subject: `Notification From E-ballot`,
        text: `${name} Wrote a new Post
        Hi ${email}
        Title of the Blog is ${title}
        <a>Check It Out</a>
        `
      })
    }catch(err){
      console.log(err)
    }
  }
}