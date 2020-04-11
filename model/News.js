const { Schema, model } = require('mongoose');

var newsSchema = new Schema(
  {
    title:{
      type: String,
      required: true,
      unique: true
    },
    content:{
      type:String,
      required: true,
      trim: true
    },
    electionid:{
      type: Schema.Types.ObjectId,
      ref: "election"
    },
    user:{
      type: Schema.Types.ObjectId,
      ref:"user"
    }
  },
  { timestamps: true }
);

var News
try {
  News = model('news');
} catch  {
  News = model('news', newsSchema);
}

module.exports = News