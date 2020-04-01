const People = require('../../model/People');
const { sendNomineeInvitation, sendVotterInvitation } = require('../../utils/sendEmail');


module.exports = {
  async nomineeinvitation(req, res){
    try{
      
      var peopledata = await People.find({ec: "5e78ab61036c5814acbc1e0c"})
      console.log(peopledata.length);
      for(var i = 0; i < peopledata.length; i++){
        if(peopledata[i].type === "nominee"){
          await sendNomineeInvitation(peopledata[i].email, peopledata[i].ph_no,req.body.date)
        }
      }
    }catch(err){
      console.log(err)
    } 
      
  },

  async voterinvitation(req, res){
    try{
      var peopledata = await People.find({ec: "5e78ab61036c5814acbc1e0c"})
      console.log(peopledata.length);
      for(var i = 0; i < peopledata.length; i++){
        if(peopledata[i].type === "voter"){
          await sendVotterInvitation(peopledata[i].email, peopledata[i].ph_no,req.body.date)
        }
      }
    }catch(err){
      console.log(err)
    } 
      
  },
}