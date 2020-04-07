const People = require('../../model/People');
const { sendNomineeInvitation, sendVotterInvitation } = require('../../utils/sendEmail');


module.exports = {
  async nomineeinvitation(req, res){
    try{
      
      var peopledata = await People.findOne({electionid: req.params.electionid})
      if(!peopledata){
        let error = new Error('Choose the proper selection');
        error.statusCode = 409;
        throw error
      }
      console.log(peopledata.length);
      for(var i = 0; i < peopledata.length; i++){
        if(peopledata[i].type === "nominee"){
          await sendNomineeInvitation(peopledata[i].email, peopledata[i].ph_no,req.body.date)
        }
      }
      res.json({message: "Email send Sucessfuly"}).status(200)
    }catch(err){
      if(!err.statusCode){
        err.statusCode = 500;
      }
      res.json({message: err.message}).status(err.statusCode)
    } 
      
  },

  async voterinvitation(req, res){
    try{
      var peopledata = await People.findOne({electionid: req.params.electionid})
      if(!peopledata){
        let error = new Error('Choose the proper selection');
        error.statusCode = 409;
        throw error
      }
      console.log(peopledata.length);
      for(var i = 0; i < peopledata.length; i++){
        if(peopledata[i].type === "voter"){
          await sendVotterInvitation(peopledata[i].email, peopledata[i].ph_no,req.body.date)
        }
      }
      res.json({message: "Email send Sucessfuly"}).status(200)
    }catch(err){
      if(!err.statusCode){
        err.statusCode = 500;
      }
      res.json({message: err.message}).status(err.statusCode)
    } 
      
  },
}