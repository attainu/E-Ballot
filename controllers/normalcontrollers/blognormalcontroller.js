const Blog = require('../../model/Blog');
const Election = require('../../model/Election');

module.exports = {
  async viewBlog(req, res){
      var blogid = req.params.blogid;
      var blog = await Blog.findOne({_id: blogid})
      if(!blog){
        return res.json({errormessage: "Blog is not Found"});
      }
      res.json(blog)
  },

  async electionViewBlog(req, res){
      var electionid = req.params.electionid;
      var checkElection = await Election.findOne({_id: electionid});
      if(!checkElection){
        return res.json({errormessage: "ELection id is not Find"}).status(400);
      }
      var electionBlog = await Blog.findOne({electionid: electionid});
      res.json(electionBlog).status(200)
  }
}