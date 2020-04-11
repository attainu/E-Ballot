const Election = require('../../model/Election');
const People = require('../../model/People');
const Blog = require('../../model/Blog');
const Profile = require('../../model/Profile');
const News = require('../../model/News');
const User = require('../../model/User');
const isvalid = require('../../files/validdate');

module.exports={
  async createElection(req, res){
    try {
      var user = req.user;
      if(user.emailOTP){
        return res.send('First verify')
      }
      var checkEname = await Election.findOne({ename: req.body.ename});
      if(checkEname){
        let error = new Error('Election Name is already Registered')
        error.statusCode = 409;
        throw error
      };
      // Check the Date Format is correct 
      var isvaliddate = isvalid(req.body.date);
      if(!isvaliddate){
        let error = new Error('Election Date Formate is wrong. Kindly change the date into the respective format YYYY-MM-DD')
        error.statusCode = 409;
        throw error
      }

      
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
      // console.log(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds())
      let electiondate = new Date(req.body.date);
      let currentdate = new Date(today);
      
      if(electiondate > currentdate){
        // check the End time should be greater than the start time
        var start_time = (req.body.start_time);
        var end_time = (req.body.end_time);
        
        if (end_time > start_time){
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
          res.json(election).status(200)
        }
        else{
          let error = new Error('End TIme should be greater than start time');
          error.statusCode = 400;
          throw error
        }
      }
      else{
        let error = new Error('Choose the FUture date for election');
        error.statusCode = 400;
        throw error
      }
        
    } catch (error) {
      res.json({error: error.message}).status(error.statusCode)
    }
  },
// update the election date or Election Name
  async updateElection(req, res){
    try {
      var checkElection = await Election.findOne({_id: req.params.electionid});
      if(!checkElection){
        return res.json({message: " Election id is deleted or not yet created"}).status(401);
      }
      var isvaliddate = isvalid(req.body.date);
      if(!isvaliddate){
        let error = new Error('Election Date Format is wrong change the date into the respective format YYYY-MM-DD')
        error.statusCode = 409;
        throw error
      }
      var user = req.user;
      var electionid = req.params.electionid;
      var users = await User.findOne({ _id: user._id});
      if(!users){
        let error = new Error('Your ara not a authriozed Person to Create a Election')
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
        var start_time = (req.body.start_time);
        var end_time = (req.body.end_time);
        
        if (end_time > start_time){
          var election = {
                          "ename" : req.body.ename,
                          "date" : req.body.date,
                          "start_time" : req.body.date+"T"+req.body.start_time+".000Z",
                          "end_time" : req.body.date+"T"+req.body.end_time+".000Z",
                          "comission" : user._id
                          }
          
          var election = await Election.update({_id:electionid},{...election});
          return res.json({message: "Election details are updated"}).status(200);
        }
        else{
          let error =  new Error('End Time should be greater than start time');
          error.statusCode = 500;
          throw error
        }
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
      var checkElection = await Election.findOne({_id: req.params.electionid});
      if(!checkElection){
        return res.json({message: " Election id is deleted or not yet created"}).status(401);
      }

      var user = req.user;
      var electionid = req.params.electionid;
      var users = await User.findOne({ _id: user._id});
      if(!users){
        return res.json({message: "Your ara not a authriozed Person to Create a Election"}).status(401);
      }

      await Election.deleteOne({comission: user._id, _id:electionid});

      await People.deleteMany({electionid: electionid});

      await Blog.deleteMany({electionid: electionid});
      
      await News.deleteMany({electionid: electionid});
      
      await User.updateOne({_id:user._id}, { $pull: { electionid: electionid }})
      
      return res.json({message: "Election Deleted Successfully!"}).send(200)

    } catch (error) {
      res.json({error: error.message}).status(500)
    }
  }
}