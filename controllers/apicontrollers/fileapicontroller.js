const People = require('../../model/People');
const Profile = require('../../model/Profile');
const XLSX = require('xlsx');
const path = require('path')
const fs = require('fs');
const parse = require('csv-parse');
const Election = require('../../model/Election');
const bcrypt = require('bcryptjs');

const {checkEmail, checkPhone, isvalidNumber } = require('../../files/checkFiles');

module.exports = {
  async fileupload(req, res, next){
    try{
      var user = req.user;
      var election = await Election.findById({_id: req.params.electionid})
      if(!election){
        let error = new Error('You have choosen the Wrong election');
        error.statusCode = 401;
        throw error;
      }
      var filename = req.file.filename.split(".")
      // XLSX Package is used to change the Excel file into CSV file
      const workBook = XLSX.readFile(path.join(__dirname, "../../"+req.file.path));
      XLSX.writeFile(workBook, filename[0]+".csv");
      // unlink will delete the excel file once the CSV file is created
      fs.unlink(path.join(__dirname, "../../"+req.file.path), (err)=>{
        if(err){
          let error = new Error('No Such File Path Available');
          error.statusCode = 400;
          throw error
        }
      });
      // parser will seperate the data from csv file and store in the DB
      var parser = parse({delimiter: ','}, async (err, data) => {
        // Check the Nominee email is already registered or not
        var checkEmails = await checkEmail(data, req.params.electionid);
        if(checkEmails){
          console.log("People is find")
          return res.json({message: 'Email  is already registered. Knidly Check it'}).status(401)
        }
        // check the nominee phone number
        var checkphones = await checkPhone(data, req.params.electionid);
        if(checkphones){
          return res.json({message: 'Phone number is already registered. Knidly Check it'}).status(401)
        }
        // Check the valid number
        var isvalid = await isvalidNumber(data);
        if(isvalid){
          return res.json({message: 'Phone number length is not equal to 10. Knidly Check it'}).status(401)
        }
        data.forEach(async function(line) {
          if(line[4] != "DOB"){
          // create country object out of parsed fields
          var userData = { "name" : line[0]
                        , "email" : line[1]
                        , "address" : line[2]
                        , "ph_no" : line[3]
                        , "password": line[3]
                        , "emailOTP": Math.floor(100000 + Math.random() * 900000)
                        , "electionid": req.params.electionid
                        , "type": line[5]
                        , "user": user._id
                        };
          var people = new People({...userData})
          people.save();
          // if the type is nominee means store the id in the election db
          if(line[5] == "nominee"){
            var election = Election.findOneAndUpdate(
              { _id: req.params.electionid},
              { $push: { nominees: { id: data._id}}},
              {upsert: true}, function(err, doc) {
                if (err) return res.send(500, {error: err});
            });
            const passwordHasing = await bcrypt.hash(line[3], 10)
            password = passwordHasing;
            console.log(people._id)
            var profileData = { "name": line[0]
                              , "email": line[1]
                              , "address": line[2]
                              , "ph_no": line[3]
                              , "DOB": line[4]
                              , "password": password
                              , "userid": people._id
                              }
            var profile = new Profile({...profileData});
            profile.save()
          }
          }
        });  
        res.send("File Names Are Uploaded")  
      });
      // fs.createReadStream() allows you to open up a readable stream in a very simple manner
      fs.createReadStream(path.join(__dirname, "../../"+filename[0]+".csv"))
        .pipe(parser)
      
    }
    catch(err){
      if(!err.statusCode){
        err.statusCode = 500;
      }
      res.json({message: err.message}).status(err.statusCode)
    }
  }
}