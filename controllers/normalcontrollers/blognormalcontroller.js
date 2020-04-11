const Blog = require('../../model/Blog');
const Election = require('../../model/Election');
const seachOperation = require('../../files/search');

module.exports = {
  async viewBlog(req, res){
      var blogid = req.params.blogid;
      var search = req.query.q;
      // console.log("search: "+search)
      if(search){
        var searchResult =  await seachOperation(user, search);
        return res.json(searchResult)
      }
      var blog = await Blog.findOne({_id: blogid}, {userid: 0, electionid: 0, createdAt:0, updatedAt: 0, __v: 0})
      if(!blog){
        return res.json({errormessage: "Blog is not Found"});
      }
      res.json(blog)
  },

  async electionViewBlog(req, res){
      var search = req.query.q;
      console.log("search: "+search)
      if(search){
        var searchResult =  await seachOperation(user, search);
        return res.json(searchResult)
      }
      var electionid = req.params.electionid;
      var checkElection = await Election.findOne({_id: electionid}, {userid: 0, electionid: 0, createdAt:0, updatedAt: 0, __v: 0})
      if(!checkElection){
        return res.json({errormessage: "ELection id is not Find"}).status(400);
      }
      var electionBlog = await Blog.findOne({electionid: electionid});
      res.json(electionBlog).status(200)
  }
}