var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var Schema = mongoose.Schema;

var peopleSchema = new Schema(
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
    ph_no: {
      unique: true,
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    type:{
      type: String,
      required: true
    },
    emailOTP:{
      type:Number,
      trim: true
    },
    isFirst:{
      default: true,
      type: Boolean,
      trim: true
    },
    isEmailNotification:{
      default: true,
      type: Boolean,
      trim: true
    },
    isVoted:{
      default: false,
      type: Boolean,
      trim: true
    },
    electionid:{
      type: Schema.Types.ObjectId,
      required: true
    },
    user:{
      type: Schema.Types.ObjectId,
      required: true
    },
    blog:[{
      type: Schema.Types.ObjectId,
      ref: "blog"
    }],
    token:{
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

peopleSchema.statics.findByEmailAndPassword = function(email, password) {
  var userObj = null;
  return new Promise(function(resolve, reject) {
    People.findOne({ email: email })
      .then(function(user) {
        // console.log('Schema User: '+user)
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
peopleSchema.pre("save", function(next) {
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
peopleSchema.pre("remove", function(next) {
  Todo.deleteMany({ user: this._id })
    .then(function() {
      next();
    })
    .catch(function(err) {
      next(err);
    });
});

var People
try {
  People = mongoose.model('people')
} catch (error) {
  People = mongoose.model('people', peopleSchema)
}

module.exports = People;