const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var blogSchema = new Schema({
  title:{
    type: String,
    required: true,
    trim: true
  },
  content:{
    type: String,
    required: true,
    trim: true
  },
  userid:{
    type: Schema.Types.ObjectId,
    required: true
  },
  electionid:{
    type: Schema.Types.ObjectId,
    required: true
  },
  likes:[{
    type: Schema.Types.ObjectId,
    ref: "like"
  }],
  comments:[{
    type: Schema.Types.ObjectId,
    ref: "comment"
  }]
},{
  timestamps: true
})

var Blog
try{
  Blog = mongoose.model('blog')
}catch{
  Blog = mongoose.model('blog', blogSchema)
}

module.exports = Blog
