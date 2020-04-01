const People = require('../../model/People');
const Votelist = require('../../model/Votelist');
const Election = require('../../model/Election');

const ip = require('ip');

module.exports = {
  async votetoNominee(req, res){
    try {
      var nomineeid = req.params.nomineeid;
      var userid = req.headers.userid;
      var electionid = req.headers.electionid;
      
      var election = await Election.findById({_id: electionid})

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
      const today = date.getFullYear()+"-"+month+"-"+tdate+"T"+hour+":"+mins+":"+sec+".000Z";
      console.log(today)
      console.log(election.start_time);
      let electionstartdate = new Date(election.start_time);
      let electionenddate = new Date(election.end_time);
      let currentdate = new Date(today);
      console.log("Start Date: "+electionstartdate.getTime());
      // console.log("End Date: "+electionenddate.getTime());
      console.log("Current Date: "+currentdate.getTime())
      if(currentdate.getTime() > electionstartdate.getTime()){
        
        if(electionenddate.getTime() < currentdate.getTime()){
          
          res.send('Election link is expired');
          var linkExpired = true;
        }
        else{
          // res.send('Election is in Live')
          var linkExpired = false;
        }
      }
      else{
        res.send('Election is Not yet Started')
      }
      
      if(linkExpired === false){
        var people = await People.find({_id: userid})
        console.log(people.length)
        if(people.length === 0 ){
          res.send('Your Name is not in the VOter list')
        }
        else if(people.length === 1){
          if(people[0].isVoted === false){
            var votelist = await Votelist({});
            votelist.ip = ip.address();
            votelist.voterid = userid;
            votelist.nomineeid = nomineeid;
            votelist.electionid = electionid;

            await votelist.save();

            console.log(election)
            await People.update({_id:userid},{isVoted: true});
            res.send('Voted SUccessfully')
          }
          else{
            res.send('Already Voted')
          }
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }
}