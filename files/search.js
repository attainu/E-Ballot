const People = require('../model/People');
const Profile = require('../model/Profile');
const User = require('../model/User');
const Election = require('../model/Election');

module.exports = async (user, search)=>{
  
  var userData = user;
  var searchText = search;
  console.log("searchText: "+ searchText)
  var election = await Election.findOne({ename: searchText}, { 
    _id : 0, 
    userid: 0, 
    createdAt: 0, 
    updatedAt: 0, 
    __v: 0, 
    password: 0 });
  if(election){
    return election  
  };
  
  var profile = await Profile.find({name:{$regex:`.*${searchText}.*`}}, { 
    _id : 0, 
    userid: 0, 
    createdAt: 0, 
    updatedAt: 0, 
    __v: 0, 
    password: 0 });
  if(profile){
    return profile
  }
}