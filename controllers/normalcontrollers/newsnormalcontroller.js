const News = require('../../model/News');
const Election = require('../../model/Election');
const seachOperation = require('../../files/search');

module.exports = {
  async electionNews(req, res){
    var search = req.query.q;
      console.log("search: "+search)
      if(search){
        var searchResult =  await seachOperation(user, search);
        return res.json(searchResult)
      }
    var electionid = req.params.electionid;
    var election = await Election.findOne({_id: electionid});
    if(!election){
      return res.json({errormessage: "Election is not found"})
    }
    var news = await News.find({electionid: electionid}, {createdAt: 0, updatedAt: 0, __v:0, electionid: 0, user:0});
    res.json(news)
  },

  async viewNews(req, res){
    var search = req.query.q;
      console.log("search: "+search)
      if(search){
        var searchResult =  await seachOperation(user, search);
        return res.json(searchResult)
      }
    var newsid = req.params.newsid;
    var news = await News.findOne({_id: newsid}, {createdAt: 0, updatedAt: 0, __v:0, electionid: 0, user:0});
    if(!news){
      return res.json({errormessage: "News is not Found"}).status(409);
    }
    res.json(news)
  }
}