const Election = require('../../model/Election');
const User = require('../../model/User');

module.exports={
  async createElection(req, res){
    try {
      var userid = req.headers.userid;
      var user = await User.find({ _id: userid});
      if(user.length === 0 ){
        res.send("Your ara not a authriozed Person to Create a Election")
      }
      else if(user.length === 1){
        // Check the ELection date is greater than the current date
        let date = new Date();
        const month = date.getMonth()+1;
        const today = date.getFullYear()+"-0"+month+"-"+date.getDate();
        console.log(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds())
        let electiondate = new Date(req.body.date);
        let currentdate = new Date(today);
        
        if(electiondate > currentdate){
          var election = await Election({});
          election.ename = req.body.ename;
          election.date = req.body.date;
          election.start_time = req.body.date+"T"+req.body.start_time+".000Z";
          election.end_time = req.body.date+"T"+req.body.end_time+".000Z"
          election.comission = userid;
          await election.save();
          req.session.electionid = election._id;
          res.redirect('/comission');
          // res.send('Election is Successfully Created');
        }
        else{
          res.send("Choose the Future Date for Election")
        }
        
      }
    } catch (error) {
      res.json(error)
    }
  },
// update the election date or Election Name
  async updateElection(req, res){
    try {
      var userid = req.headers.userid;
      var electionid = req.params.electionid;
      var user = await User.find({ _id: userid});
      if(user.length === 0 ){
        res.send("Your ara not a authriozed Person to Edit  Election")
      }
      else if(user.length === 1){
         // Check the ELection date is greater than the current date
         let date = new Date();
         const month = date.getMonth()+1;
         const today = date.getFullYear()+"-0"+month+"-"+date.getDate();
         let electiondate = new Date(req.body.date);
         let currentdate = new Date(today)
         
         if(electiondate > currentdate){
          var election = await Election.update({comission: userid, _id:electionid},{...req.body});
          res.json(election)
         }
         else{
          res.send("Choose the Future Date for Election")
         }
      }
    } catch (error) {
      res.json(error)
    }
  },
  // Delete the election 
  async deleteElection(req, res){
    try {
      var userid = req.headers.userid;
      var electionid = req.params.electionid;
      var user = await User.find({ _id: userid});
      if(user.length === 0 ){
        res.send("Your ara not a authriozed Person to Edit  Election")
      }
      else if(user.length === 1){
        var election = await Election.deleteOne({comission: userid, _id:electionid});
        res.json(election)
      }
    } catch (error) {
      res.json(error)
    }
  },

  async checkElection(req, res){
    console.log(req.body);
  }
}