const News = require('../../model/News');
const Election = require('../../model/Election');

module.exports = {
  async electionNews(req, res){
    
    var electionid = req.params.electionid;
    var election = await Election.findOne({_id: electionid});
    if(!election){
      return res.json({errormessage: "Election is not found"})
    }
    var news = await News.find({electionid: electionid});
    res.json(news)
  },

  async viewNews(req, res){
    var newsid = req.params.newsid;
    var news = await News.findOne({_id: newsid});
    if(!news){
      return res.json({errormessage: "News is not Found"}).status(409);
    }
    res.json(news)
  }
}