const Blog = require('../../model/Blog');

module.exports = {
  async likeBlog(req, res){
    var blogid = req.params.blogid;
    var user = req.user[0];
    
    try{
      var blogslike = await Blog.findOne({ likes :user._id})
      if(!blogslike){
        var likes = await Blog.updateOne(
          {_id: blogid},
          { $push: { likes: user._id }},
          {new: true}
        );
      }
      else if(blogslike){
        var likes = await Blog.update(
          {_id: blogid},
          { $pull: { likes: user._id }},
          {new: true}
        );
      }
      
      res.send(likes).status(200)
    }catch(err){
      res.json(err).status(500)
    }
  }
}