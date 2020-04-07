const People = require('../../model/People');
const Votelist = require('../../model/Votelist');
const Election = require('../../model/Election');

module.exports = {
  async resultElection(req, res){
    try {
      var electionid = req.params.electionid;
      
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
      console.log(election.end_time);

      let electionenddate = new Date(election.end_time);
      let currentdate = new Date(today);
      
      console.log("End Date: "+ electionenddate.getTime());
      console.log("Current Date: "+ currentdate.getTime())

      if(electionenddate.getTime() < currentdate.getTime()){
        var FinalizeList = []
        var votercount = 0;
        var voter = await People.find({electionid: electionid})
        var nominee = await People.find({electionid: electionid, type: "nominee"})
        var TotalVotes = "Total Voters: "+voter.length;
        FinalizeList.push(TotalVotes)
        for( var i = 0; i< nominee.length; i++){
          console.log(nominee[i]._id)
          var voternominee = await Votelist.find({ nomineeid: nominee[i]._id})
          var nomineelist = nominee[i].name+" "+voternominee.length
          votercount = votercount+ voternominee.length
          FinalizeList.push(nomineelist)
        }
        var NoVoters = voter.length - votercount;
        FinalizeList.push("Voters Count: "+votercount);
        FinalizeList.push("Remaining VOters Count: "+ NoVoters);
        // console.log(votercount)
        res.send(FinalizeList)
      }
    } catch (error) {
      console.log(error)
    }
  }
}