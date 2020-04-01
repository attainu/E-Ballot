const Blog = require('../../model/Blog');

module.exports = {
  async likeBlog(req, res){
    var blogid = req.params.blogid;
    var userid = req.headers.userid;
    console.log("Blog Id: "+blogid);
    console.log("User Id: "+userid);
    try{
      var blogslike = await Blog.find({ user : { $nin: [userid] }})
      console.log(blogslike.length)
      if(blogslike.length === 1){
        var likes = await Blog.update(
          {_id: blogid},
          { $push: { likes: userid }},
          {new: true}
        );
      }
      else if(blogslike.length === 0 ){
        var likes = await Blog.update(
          {_id: blogid},
          { $pull: { likes: userid }},
          {new: true}
        );
      }
      res.send(likes)
    }catch(err){
      console.log(err)
    }
  }
}