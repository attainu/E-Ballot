const Comment = require('../../model/Comment');
const People = require('../../model/People');
const Blog = require('../../model/Blog');

module.exports = {
  async createComment(req, res){
    try{
      var blogid = req.params.blogid;
      var userid = req.headers.userid;
      await Comment.find({blog: blogid});
      var comment = await Comment.create({...req.body});
      comment.user = userid;
      comment.blog = blogid;
      await comment.save();

      await People.update(
        { _id: userid, blog: blogid},
        { $push: { comments: comment._id}}
      );

      await Blog.update(
        {_id: blogid, userid: userid},
        { $push: { comments: comment._id }}
      )

      res.json(comment, people)
    }
    catch(err){
      res.json(err)
    }
  },

  async deleteComment(req, res){
    try{
      var commentid = req.params.commentid;
      var userid = req.headers.userid;
      var blogid = req.params.blogid;
      console.log("Comment Id: "+commentid);
      
      await Blog.update(
        {_id: blogid},
        { $pull: { comments: commentid }}
      )

      await People.update(
        { _id: userid},
        { $pull: { comments: commentid}}
      );

      await Comment.deleteOne({_id: commentid, user: userid})
      
      res.json(Comment)

    }catch(err){
      res.json(err)
    }
  }
}