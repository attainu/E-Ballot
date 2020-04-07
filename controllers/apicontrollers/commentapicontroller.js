const Comment = require('../../model/Comment');
const People = require('../../model/People');
const Blog = require('../../model/Blog');
const User = require('../../model/User');

module.exports = {
  async createComment(req, res){
    try{
      var blogid = req.params.blogid;
      var user = req.user[0];
      
      var blog = await Blog.findById({_id: blogid});
      if(!blog){
        let error = new Error('Blog is ALready Deleted or Not Created');
        error.statusCode = 404;
        throw error
      }
      await Comment.find({blog: blogid});
      // console.log(user._id)
      var comment = await Comment.create({...req.body});
      comment.user = user._id;
      comment.blog = blogid;
      await comment.save();
      console.log(comment._id);
      var people = await People.findById({_id: user._id});
      // console.log("People: "+people)
      if(people !== null){
        await People.update(
          { _id: user._id, blog: blogid},
          { $push: { comments: comment._id}}
        );
      }
      var users = await User.findById({_id: user._id});
      // console.log(users)
      if(users !== null){
        var check = await User.updateOne(
          { _id: user._id, blog: blogid},
          { $push: { comments: comment._id }}
        );
      }
      await Blog.updateOne(
        {_id: blogid},
        { $push: { comments: comment._id }}
      )
      res.json(comment).status(200);
    }
    catch(err){
      res.json(err)
    }
  },

  async deleteComment(req, res){
    try{
      var commentid = req.params.commentid;
      var user = req.user;
      var blogid = req.params.blogid;
      // console.log("Comment Id: "+commentid);
      await Blog.update(
        {_id: blogid},
        { $pull: { comments: commentid }}
      )
      var people = await People.findById({_id: user._id});
      if(people !== null){
        await People.update(
          { _id: user._id},
          { $pull: { comments: commentid}}
        );
      }
      var users = await User.findById({_id: user._id});
      if(users !== null){
        await User.update(
          { _id: user._id},
          { $pull: { comments: commentid}}
        );
      }
      await Comment.deleteOne({_id: commentid, user: user._id})
      res.json(Comment).status(200)
    }catch(err){
      res.json(err).status(500)
    }
  }
}