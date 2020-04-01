const News = require('../../model/News');

module.exports = {
  async electionNews(req, res){
    try {
      var electionid = req.params.electionid;
      var news = await News.find({electionid: electionid});
      res.json(news)
    } catch (error) {
      res.json(error)
    }
  },

  async viewNews(req, res){
    try {
      var newsid = req.params.newsid;
      var news = await News.findById({_id: newsid});
      res.json(news)
    } catch (error) {
      res.json(error)
    }
  }
}