const People = require('../../model/People');
const User =require('../../model/User');
const Blog = require('../../model/Blog');
const Election = require('../../model/Election');

const { sendBlogMail } = require('../../utils/sendEmail');

module.exports = {
  async createBlog(req, res){
    try{
      // When Move to live change the req.headers.userid to req.session.userid
      var user = req.user[0];

      var electionid = req.params.electionid;
      console.log("electionid: "+electionid)
      const election = await Election.findOne({_id: electionid});
      if(!election){
        let error = new Error('Election is Invalid');
        error.statusCode = 401;
        throw error
      }
      var blog = new Blog({...req.body})
      blog.userid = user._id;
      blog.electionid = electionid;
      await blog.save();

      await People.update({_id: user._id}, { $push:{ blog: blog._id}})

      await User.update({_id: user._id}, { $push:{ blog: blog._id}})

      await Election.update({_id: electionid}, { $push:{ blogs: blog._id }});

      var getpeopledata = await People.find({isEmailNotification: true, electionid: electionid, type: "voter"})
      for(var i = 0; i< getpeopledata.length; i++){
        await sendBlogMail(getpeopledata[i].email, getpeopledata[i].name, getpeopledata[i].title)
      }
    }catch(err){
      res.json({error: error.message}).status(error.statusCode)
    }
  },

  async updateblog(req, res){
    try{
      var blogid = req.params.blogid;
      var user = req.user[0];
      
      var blogs = await Blog.updateOne(
        {_id: blogid, userid: user._id},
        { ...req.body},
        {new: true}
      )
      res.json(blogs).status(200)
    }catch(err){
      res.json({error: error.message}).status(500)
    }
  },

  async deteletBlog(req, res){
    try{
      var blogid = req.params.blogid;
      var users = req.user;
      
      var electionid = req.params.electionid;
      
      console.log(blogid, users._id, electionid);

      var people = await People.findOne({_id: users._id, blog:blogid} );
      // console.log(people)
      if(people){
        console.log("People ")  
        await People.update(
          {_id: users._id},
          { $pull: {blog: blogid}}
        )
      }

      var user = await User.findOne({_id: users._id, blog:blogid} )
      // console.log(user)
      if(user){
        // console.log("user")
        // console.log(users._id)
        await User.update(
          {_id: users._id},
          { $pull: {blog: blogid}}
        )
      }
      
      await Election.update({_id: electionid}, { $pull:{ blogs: blogid }});

      await Blog.deleteOne({_id: blogid, userid: users._id})
      
      res.send('Blog Deleted').status(200)

    }catch(err){
      res.json({error: error.message}).status(error.statusCode)
    }
  }
}