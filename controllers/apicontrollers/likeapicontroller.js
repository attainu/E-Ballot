const Blog = require('../../model/Blog');

module.exports = {
  async likeBlog(req, res){
    var blogid = req.params.blogid;
    var user = req.user;
    
    try{
      var checkBlog = await Blog.findOne({_id: blogid});

      if(!checkBlog){
        return res.json({message: "Blog id is invaid"}).status(401);
      }

      var blogslike = await Blog.findOne({ likes :user._id})

      if(!blogslike){
        var likes = await Blog.updateOne(
          {_id: blogid},
          { $push: { likes: user._id }},
          {new: true}
        );
        return res.json({message: "You liked this blog"}).status(200)
      }
      else if(blogslike){
        var likes = await Blog.update(
          {_id: blogid},
          { $pull: { likes: user._id }},
          {new: true}
        );
        return res.json({message: "You removed the previous like this blog"}).status(200)
      }
      
      
    }catch(err){
      res.json(err).status(500)
    }
  }
}