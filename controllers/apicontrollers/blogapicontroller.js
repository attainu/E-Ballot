const People = require('../../model/People');
const Blog = require('../../model/Blog');
const Election = require('../../model/Election');

const { sendBlogMail } = require('../../utils/sendEmail');

module.exports = {
  async createBlog(req, res){
    try{
      // When Move to live change the req.headers.userid to req.session.userid
      var userid = req.headers.userid;
      var people = await People.findById({_id: userid});
      console.log("Type People: "+people.type)

      var blog = new Blog({...req.body})
      blog.type = people.type;
      blog.userid = people._id;
      blog.electionid = people.electionid;
      await blog.save();

      await People.update({_id: userid}, { $push:{ blog: blog._id}})

      await Election.update({_id: people.electionid}, { $push:{ blogs: blog._id }});

      var getpeopledata = await People.find({isEmailNotification: true, ec: people.ec, type: "voter"})
      for(var i = 0; i< getpeopledata.length; i++){
        await sendBlogMail(getpeopledata[i].email, getpeopledata[i].name, getpeopledata[i].title)
      }
    }catch(err){
      console.log(err)
    }
  },

  async updateblog(req, res){
    try{
      var blogid = req.params.blogid;
      var userid = req.headers.userid;
      
      var blogs = await Blog.updateOne(
        {_id: blogid, userid: userid},
        { ...req.body},
        {new: true}
      )
      res.json(blogs)
    }catch(err){
      console.log(err)
    }
  },

  async deteletBlog(req, res){
    try{
      var blogid = req.params.blogid;
      var userid = req.headers.userid;
      
      var people = await People.findById({_id: userid});

      var userpull = await People.update(
        {_id: userid},
        { $pull: {blog: blogid}}
      )
      await Election.update({_id: people.electionid}, { $pull:{ blogs: blog._id }});

      var blogdel = await Blog.deleteOne({_id: blogid, userid: userid})
      
      res.json(blogdel, userpull).statucode(200);

    }catch(err){
      console.log(err)
    }
  }
}