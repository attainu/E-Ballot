var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
// var Todo = require("./Todo");
var Schema = mongoose.Schema;

var voterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      unique: true,
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    ph_no: {
      unique: true,
      type: String,
      required: true,
      trim: true
    },
    DOB:{
      type:Date,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    emailOTP:{
      type:Number,
      trim: true
    },
    isFirst:{
      default: true,
      type: Boolean,
      trim: true
    }
  },
  { timestamps: true }
);


voterSchema.statics.findByEmailAndPassword = function(email, password) {
  var userObj = null;
  return new Promise(function(resolve, reject) {
    console.log("Schema email: "+email)
    User.findOne({ Company_email: email })
      .then(function(user) {
        console.log('Schema User: '+user)
        if (!user) reject("Incorrect credentials");
        userObj = user;
        return bcrypt.compare(password, user.password);
      })
      .then(function(isMatched) {
        if (!isMatched) reject("Incorrect credentials");
        resolve(userObj);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};


// I should avoid rehashing the password twice.
voterSchema.pre("save", function(next) {
  var user = this;
  // Check whether password field is modified
  if (user.isModified("password")) {
    bcrypt
      .hash(user.password, 10)
      .then(function(hashedPassword) {
        user.password = hashedPassword;
        next();
      })
      .catch(function(err) {
        next(err);
      });
  }
});

// // Delete all user created todos, if the user gets deleted, to avoid polluting the DB
voterSchema.pre("remove", function(next) {
  Todo.deleteMany({ user: this._id })
    .then(function() {
      next();
    })
    .catch(function(err) {
      next(err);
    });
});

var Voter
try {
  Voter = mongoose.model('voter')
} catch (error) {
  Voter = mongoose.model('voter', voterSchema)
}

module.exports = Voter;