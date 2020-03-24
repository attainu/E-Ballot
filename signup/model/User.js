var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
// var Todo = require("./Todo");
var Schema = mongoose.Schema;



var userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    Company_name: {
      type: String,
      required: true,
      trim: true
    },
    Company_email: {
      unique: true,
      type: String,
      required: true,
      trim: true
    },
    Address: {
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
    nominees:[
      {
        type: Schema.Types.ObjectId,
        ref: "nominees"  
      }
    ],
    voters:[
      {
        type: Schema.Types.ObjectId,
        ref: "voter"
      }
    ]
  },
  { timestamps: true }
);


userSchema.statics.findByEmailAndPassword = function(email, password) {
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