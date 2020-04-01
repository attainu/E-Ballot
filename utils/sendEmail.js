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
  async sendNomineeInvitation(email, password,date){
    try{
      console.log(email)
      await mailTransport.sendMail({
        from: 'akshay28venkat1@gmail.com',
        to: email,
        subject: `Election is Going to Start ${date}`,
        text: `You are selected as a nomiee for the upcoming election.
        UserName: ${email}
        Password: ${password}
        Login To change the password
                All the Best.
                For More Informartion contact your Election Comission`
      })
    }catch(err){
      console.log(err)
    }
  },
  async sendVotterInvitation(email, password,date){
    try{
      console.log(email)
      await mailTransport.sendMail({
        from: 'akshay28venkat1@gmail.com',
        to: email,
        subject: `Election is Going to Start ${date}`,
        text: `Register your vote to Select your Bright Future.
        UserName: ${email}
        Password: ${password}
        Login To change the password
                All the Best.
                For More Informartion contact your Election Comission`
      })
    }catch(err){
      console.log(err)
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