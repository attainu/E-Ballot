const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var logdetailsSchema = new Schema({
  ip:{
    type: String,
    required: true
  },
  user:{
    type: Schema.Types.ObjectId,
    required: true,
  }
},
{
  timestamps: true
});

var Logdetails
try {
  Logdetails = mongoose.model('logdetails')
} catch (error) {
  Logdetails = mongoose.model('logdetails', logdetailsSchema)
}

module.exports = Logdetails;