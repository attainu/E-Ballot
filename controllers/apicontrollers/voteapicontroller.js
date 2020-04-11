const People = require('../../model/People');
const Votelist = require('../../model/Votelist');
const Election = require('../../model/Election');

const ip = require('ip');

module.exports = {
  async votetoNominee(req, res){
    try {
      var nomineeid = req.params.nomineeid;
      var userid = req.user;
      var electionid = req.params.electionid;
      // Check the Election is created or not
      var election = await Election.findById({_id: electionid})
      if(!election){
        return res.json({message: "Election is not yet created"}).statusCode(404);
      }
      let date = new Date();
      var  month = date.getMonth()+1;
      var tdate = date.getDate();
      var hour = date.getHours();
      var mins = date.getMinutes();
      var sec = date.getSeconds();

      if(month < 10){
        month = "0"+month
      }
      if(tdate< 10){
        tdate = "0"+date.getDate()
      }
      if(hour < 10){
        hour = "0"+date.getHours()
      }
      if(mins < 10){
        mins = "0"+date.getMinutes()
      }
      if(sec < 10){
        sec = "0"+date.getSeconds()
      }
      // Change the today date in the appropiate manner
      const today = date.getFullYear()+"-"+month+"-"+tdate+"T"+hour+":"+mins+":"+sec+".000Z";

      let electionstartdate = new Date(election.start_time);
      let electionenddate = new Date(election.end_time);
      let currentdate = new Date(today);
      console.log("Election start: "+electionstartdate);
      console.log("Current Date: "+currentdate)
      // Before Voting to check the Election link is expire or not
      if(currentdate.getTime() > electionstartdate.getTime()){
        if(electionenddate.getTime() < currentdate.getTime()){
          return res.json({message: "ELection is Expired"}).statusCode(409);
        }
      }
      else{
        return res.json({message: "Election is not yet started"}).status(409);
      }
      // Check the user name is in the list for the praticular election
      var people = await People.findOne({_id: userid, electionid: electionid})
      
      if(!people){
        res.json({message: "Your name is not in the list"}).status(500)
      }

      // Check the voter is already voted or not
      if(people.isVoted === false){
        var votelist = await Votelist({});
        votelist.ip = ip.address();
        votelist.voterid = userid;
        votelist.nomineeid = nomineeid;
        votelist.electionid = electionid;

        await votelist.save();

        await People.update({_id:userid},{isVoted: true});
        
        return res.send('Voted SUccessfully').status(200)
      }
      else{
        return res.json({message: 'you Already Votes'}).statusCode(500);
      }

    } catch (error) {
      res.json({message: error.message}).status(500)
    }
  }
}