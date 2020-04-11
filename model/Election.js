const { Schema, model } =  require('mongoose');

var electionSchema = new Schema(
  {
    ename: {
      type: String,
      required: true,
      unique: true, 
      trim: true
    },
    date:{
      type: Date,
      required: true,
      trim: true
    },
    start_time:{
      type:Date,
      required: true,
      trim: true
    },
    end_time:{
      type:Date,
      required: true,
      trim: true
    },
    blogs:[{
      type: Schema.Types.ObjectId,
      ref:"blog"
    }],
    nominees:[{
    }],
    comission:{
      type: Schema.Types.ObjectId,
      ref:"user"
    },
    isStatus:{
      type: String,
      Default: "created",
    }
  },
  {
    timestamps: true
  }
)

var Election
try {
  Election = model('election')
} catch {
  Election = model('election', electionSchema)
};

module.exports = Election;