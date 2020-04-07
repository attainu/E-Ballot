const Election = require('../../model/Election');
const User = require('../../model/User');

module.exports={
  async createElection(req, res){
    try {
      var checkEname = await Election.findOne({ename: req.body.ename});
      if(checkEname){
        let errror = new Error('Election Name is already Registered')
        error.statusCode = 409;
        throw error
      };
      var user = req.user[0];
      var users = await User.findOne({ _id: user._id});
      if(!users){
        let errror = new Error('Your ara not a authriozed Person to Create a Election')
        error.statusCode = 409;
        throw error
      }
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
        election.comission = user._id;
        await election.save();
        var users = await User.update(
          {_id: user._id},
          { $push: { electionid: election._id }},
          { new: true }
        )
        req.params.electionid = election._id;
        res.json(election)
      }
      else{
        res.send("Choose the Future Date for Election")
      }
        
    } catch (error) {
      res.json({error: error.message}).status(error.statusCode)
    }
  },
// update the election date or Election Name
  async updateElection(req, res){
    try {
      var user = req.user[0];
      var electionid = req.params.electionid;
      var users = await User.findOne({ _id: user._id});
      if(!users){
        let errror = new Error('Your ara not a authriozed Person to Create a Election')
        error.statusCode = 409;
        throw error
      }
      
         // Check the ELection date is greater than the current date
         let date = new Date();
         const month = date.getMonth()+1;
         const today = date.getFullYear()+"-0"+month+"-"+date.getDate();
         let electiondate = new Date(req.body.date);
         let currentdate = new Date(today)
         
         if(electiondate > currentdate){
          var election = await Election.update({comission: user._id, _id:electionid},{...req.body});
          res.json(election)
         }
         else{
          let error =  new Error('Select the Future Date for the Election');
          error.statusCode = 500;
          throw error
         }
    } catch (error) {
      res.json({error: error.message}).status(error.statusCode)
    }
  },
  // Delete the election 
  async deleteElection(req, res){
    try {
      var user = req.user[0];
      var electionid = req.params.electionid;
      var users = await User.findOne({ _id: user._id});
      if(!users){
        let errror = new Error('Your ara not a authriozed Person to Create a Election')
        error.statusCode = 409;
        throw error
      }
      var election = await Election.deleteOne({comission: user._id, _id:electionid});
      await User.updateOne({_id:user._id}, { $pull: { electionid: electionid }})
      res.json(election).send(200)

    } catch (error) {
      res.json({error: error.message}).status(error.statusCode)
    }
  }
}