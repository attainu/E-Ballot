const Blog = require('../../model/Blog');
const Comment = require('../../model/Comment');

module.exports = {
  async viewBlog(req, res){
    try {
      var userid = req.headers.userid;
      var blog = await Blog.find({userid: userid})
      res.json(blog)
    } catch (error) {
      console.log(error)
    }
  },

  async electionViewBlog(req, res){
    try {
      var electionid = req.params.electionid;
      var electionBlog = await Blog.find({electionid: electionid});
      res.json(electionBlog)
    } catch (error) {
      console.log(error)
    }
  }
}