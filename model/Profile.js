const { Schema, model } = require('mongoose');

const profileSchema = new Schema(
  {
    userid: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    name:{
      type: String,
      required: true
    },
    email:{
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    DOB:{
      type:Date,
      required: true,
      trim: true
    },
    ph_no:{
      type: String,
      unique: true
    },
    password:{
      type: String,
      required: true
    },
    education:{
      type: String
    },
    description:{
      type: String,
      trim: true
    },
    records:[
      {
      type: String,
      trim: true
    }],
    pledge:{
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
)

var Profile
try{
  Profile = model('profile')
}catch{
  Profile = model('profile', profileSchema)
}

module.exports = Profile