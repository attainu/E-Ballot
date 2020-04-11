const { Schema, model } = require('mongoose')

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true
    },
    user:{
      type: Schema.Types.ObjectId,
      ref: "people"
    },
    blog:{
      type: Schema.Types.ObjectId,
      ref: "blog"
    }
  },
  { timestamps: true}
)

var Comment
try{
  Comment = model('comment')
}catch{
  Comment = model('comment', commentSchema)
}

module.exports = Comment;