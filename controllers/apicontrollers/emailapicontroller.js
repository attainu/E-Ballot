const People = require('../../model/People');
const { sendFileInvitation } = require('../../utils/sendEmail');


module.exports = {
  async fileinvitation(req, res){
    try{
      var user = req.user;
      var peopledata = await People.find({electionid: req.params.electionid, user: user._id})
      // check for the data for the election
      if(!peopledata){
        return res.json({message: "No User Data available for this election. Kindly upload the file to send the data"}).status(err.statusCode)
      }
      // sending the username and password
      for(var i = 0; i < peopledata.length; i++){
        await sendFileInvitation(peopledata[i].email, peopledata[i].ph_no,req.body.date)
      }
      res.json({message: "Email send Sucessfuly"}).status(200)
    }catch(err){
      if(!err.statusCode){
        err.statusCode = 500;
      }
      return res.json({message: "No User Data available for this election. Kindly upload the file to send the data or else you choosen the wrong election id"}).status(err.statusCode)
    } 
  }
}