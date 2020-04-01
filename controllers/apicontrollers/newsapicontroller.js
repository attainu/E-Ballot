const User = require('../../model/User');
const News = require('../../model/News');
module.exports = {
  async createNews(req, res){
    try {
      var electionid = req.params.electionid;
      var userid = req.headers.userid;
      console.log(userid)
      var user = await User.find({_id: userid})
      if(user.length === 0 ){
        res.send("Your ara not a authriozed Person to Create a News")
      }
      else if(user.length === 1){
        var news = await News.create({...req.body});
        news.electionid = electionid
        news.user = userid;
        await news.save();
        res.json(news)
      }

    } catch (error) {
      res.send("Your ara not a authriozed Person to Create a News")
    }
  },

  async updateNews(req, res){
    try{
      var newsid = req.params.newsid;
      var electionid = req.params.electionid;
      var userid = req.headers.userid;
      console.log(userid)
      var user = await User.find({_id: userid})
      console.log(user)
      if(user.length === 0 ){
        res.send("Your ara not a authriozed Person to Create a News")
      }
      else if(user.length === 1){
        var news = await News.update({_id: newsid},{...req.body}, { new: true});
        res.json(news)
      }

    } catch (error) {
      res.send("Your ara not a authriozed Person to Create a News Catch Method")
    }
  },

  async deleteNews(req, res){
    try {
      var newsid = req.params.newsid;
      var electionid = req.params.electionid;
      var userid = req.headers.userid;
      console.log(userid)
      var user = await User.find({_id: userid})
      console.log(user)
      if(user.length === 0 ){
        res.send("Your ara not a authriozed Person to Create a News")
      }
      else if(user.length === 1){
        var news = await News.deleteOne({_id: newsid});
        res.json(news)
      }
    } catch (error) {
      res.send("Your ara not a authriozed Person to Create a News Catch Method")
    }
  }
}