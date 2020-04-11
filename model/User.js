var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    company_name: {
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
    password: {
      type: String,
      required: true,
      trim: true
    },
    emailOTP:{
      type:Number,
      unique: true,
      trim: true
    },
    electionid:[
      {
        type: Schema.Types.ObjectId,
        ref:"election"
      }
    ],
    blog:[
      {
        type: Schema.Types.ObjectId,
        ref: "blog"
      }
    ],
    news:[
      {
        type: Schema.Types.ObjectId,
        ref: "news"
      }
    ],
    token:{
      type: String,
      unique: true
    }
  },
  { timestamps: true }
);

userSchema.statics.findByEmailAndPassword = function(email, password) {
  var userObj = null;
  return new Promise(function(resolve, reject) {
    User.findOne({ email: email })
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
userSchema.pre("save", function(next) {
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
userSchema.pre("remove", function(next) {
  Todo.deleteMany({ user: this._id })
    .then(function() {
      next();
    })
    .catch(function(err) {
      next(err);
    });
});

var User
try {
  User = mongoose.model('user')
} catch (error) {
  User = mongoose.model('user', userSchema)
}

module.exports = User;