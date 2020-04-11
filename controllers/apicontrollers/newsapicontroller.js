const User = require('../../model/User');
const News = require('../../model/News');
module.exports = {
  async createNews(req, res){
    try {
      var electionid = req.params.electionid;
      var user = req.user;

      var checkNews = await News.findOne({title: req.body.title, electionid: electionid})
      if(checkNews){
        return res.json({message: "Title of the news is already created"}).status(500)
      }
      // check for the users is autherizoed to create a News
      var users = await User.findOne({_id: user._id})
      if(!users){
        return res.json({message: 'You are not a autherizoed person to create the News'}).status(401)
      }
      
      var news = await News.create({...req.body});
      news.electionid = electionid
      news.user = user._id;
      await news.save();
      await User.updateOne({_id: user._id},{ $push: { news: news._id }})
      res.json({message: "NEWS Created Sucessfully !!", _id: news._id}).status(200)

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
      
      var checkNews = await News.findOne({title: req.body.title, _id: newsid})
      if(checkNews){
        return res.json({message: "Title of the news is already created"}).status(500)
      }

      var users = await User.findOne({_id: user._id})
      console.log(users)
      if(!users){
        return res.json({message: 'You are not a autherizoed person to Edit the News'}).status(401)
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
      var user = req.user;
      var checkNews = await News.findOne({_id: newsid});
      if(!checkNews){
        return res.json({message: 'News is Deleted or not yet created'}).status(401)
      }
      var users = await User.findOne({_id: user._id})
      console.log(user)
      if(!users){
        return res.json({message: 'You are not a autherizoed person to Delete the News'}).status(401)
      }
      
      var news = await News.deleteOne({_id: newsid});
      await User.update({_id: user._id}, { $pull: { news: newsid}})
      res.json({message: "Deleted Successfully!!"}).status(200)
      
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }
}