const User = require('../../model/User');
const News = require('../../model/News');
module.exports = {
  async createNews(req, res){
    try {
      var electionid = req.params.electionid;
      var user = req.user;
      // check for the users is autherizoed to create a News
      var users = await User.find({_id: user._id})
      if(users.length === 0 ){
        let error = new Error('You are not a autherizoed person to create the News');
        error.statusCode = 401;
        throw error;
      }
      else if(users.length === 1){
        var news = await News.create({...req.body});
        news.electionid = electionid
        news.user = user._id;
        await news.save();
        await User.updateOne({_id: user._id},{ $push: { news: news._id }})
        res.json(news)
      }

    } catch (error) {
      if(!error.statusCode){
        error.statusCode = 500;
      }
      res.status(error.statusCode).json({message: error.message})
    }
  },

  async updateNews(req, res){
    try{
      var newsid = req.params.newsid;
      var user = req.user;

      var users = await User.findOne({_id: user._id})
      console.log(users)
      if(!users){
        let error = new Error('You are not a authriozed person to edit the election datas');
        error.statusCode = 500;
        throw error;
      }
      var news = await News.updateOne({_id: newsid},{...req.body}, { new: true});
      res.json({message: "Election Data is updated"}).status(200)
    } catch (error) {
      res.status(error.statusCode).json({message: error.message})
    }
  },

  async deleteNews(req, res){
    try {
      var newsid = req.params.newsid;
      var user = req.user[0];
      
      var users = await User.findOne({_id: user._id})
      console.log(user)
      if(!users){
        let error = new Error('You are not a authriozed person to Delete the election datas');
        error.statusCode = 500;
        throw error;
      }
      else if(users.length === 1){
        var news = await News.deleteOne({_id: newsid});
        await User.update({_id: user._id}, { $pull: { news: newsid}})
        res.json(news)
      }
    } catch (error) {
      res.status(error.statusCode).json({message: error.message})
    }
  }
}