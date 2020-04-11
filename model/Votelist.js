const { Schema, model } = require('mongoose');

var voterlistSchema = new Schema(
  {
    voterid: {
      type: Schema.Types.ObjectId,
      ref: "people"
    },
    ipaddress:{
      type: String,
      trim: true
    },
    nomineeid:{
      type:Schema.Types.ObjectId,
      ref:"people"
    },
    electionid:{
      type: Schema.Types.ObjectId,
      ref:"election"
    }
  },
  { 
    timestamps: true
  }
);

var Votelist
try {
  Votelist = model('votelist')
} catch {
  Votelist = model('votelist', voterlistSchema)
}

module.exports = Votelist;