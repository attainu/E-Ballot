const Comment = require('../../model/Comment');
const People = require('../../model/People');
const Blog = require('../../model/Blog');
const User = require('../../model/User');

module.exports = {
  async createComment(req, res){
    try{
      var blogid = req.params.blogid;
      var user = req.user;
      // Check for the Blog is in active or not before comment
      var blog = await Blog.findById({_id: blogid});
      if(!blog){
        return res.json({message: "Blog id is invaid"}).status(401);
      }

      var comment = await Comment.create({...req.body});
      comment.user = user._id;
      comment.blog = blogid;
      await comment.save();
      
      await Blog.updateOne(
        {_id: blogid},
        { $push: { comments: comment._id }}
      )
      res.json({message: "Commented", id: comment._id}).status(200);
    }
    catch(err){
      res.json({message: err.message}).status(500);
    }
  },

  async deleteComment(req, res){
    try{
      var commentid = req.params.commentid;
      var user = req.user;
      var blogid = req.params.blogid;
      // Check for the Blog is in active or not before comment
      var blog = await Blog.findById({_id: blogid});
      if(!blog){
        return res.json({message: "Blog id is invaid"}).status(401);
      }

      // Pull the comment id from the blog
      await Blog.update(
        {_id: blogid},
        { $pull: { comments: commentid }}
      )
      
      await Comment.deleteOne({_id: commentid, user: user._id})

      res.json({message: "Comment Deleted Successfully"}).status(200)
    }catch(err){
      res.json({message: err.message}).status(500)
    }
  }
}