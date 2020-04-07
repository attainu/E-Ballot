const People = require('../../model/People');
const XLSX = require('xlsx');
const path = require('path')
const fs = require('fs');
const parse = require('csv-parse');
const Election = require('../../model/Election');

module.exports = {
  async nomineefileupload(req, res, next){
    try{
      var user = req.user[0];
      var election = await Election.findById({_id: req.params.electionid})
      console.log(election)
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
        console.log(err)
      });
      // parser will seperate the data from csv file and store in the DB
      var parser = parse({delimiter: ','}, function (err, data) {
        data.forEach(function(line) {
          if(line[4] != "DOB"){
          // create country object out of parsed fields
          var country = { "name" : line[0]
                        , "email" : line[1]
                        , "address" : line[2]
                        , "ph_no" : line[3]
                        , "DOB" : line[4]
                        , "password": line[3]
                        , "emailOTP": Math.floor(100000 + Math.random() * 900000)
                        , "electionid": req.params.electionid
                        , "type": "nominee"
                        , "user": user._id
                        };
                      
          var people = new People({...country})
          people
            .save()
            .then(data =>{
              console.log("Data: "+data._id)
              var election = Election.findOneAndUpdate(
                { _id: req.params.electionid},
                { $push: { nominees: { id: data._id, voter:[] }}},
                {upsert: true}, function(err, doc) {
                  if (err) return res.send(500, {error: err});
              })
            })
            .catch(err=>{
              console.log(err.message)
            })
          }
        });    
      });
      // fs.createReadStream() allows you to open up a readable stream in a very simple manner
      fs.createReadStream(path.join(__dirname, "../../"+filename[0]+".csv"))
        .pipe(parser)
      res.send("Nominee Names Are Uploaded")
    }
    catch(err){
      if(!err.statusCode){
        err.statusCode = 500;
      }
      res.json({message: err.message}).status(err.statusCode)
    }
  },

  async voterfileupload(req, res, next){
    try{
      var electionid = req.params.electionid;
      var user = req.user[0];

      var election = await Election.findById({_id: electionid})
      
      if(!election){
        let error = new Error('You have choosen the Wrong election');
        error.statusCode = 401;
        throw error;
      }
      // console.log(req.file.filename)
      var filename = req.file.filename.split(".")
      // XLSX Package is used to change the Excel file into CSV file
      const workBook = XLSX.readFile(path.join(__dirname, "../../"+req.file.path));
      XLSX.writeFile(workBook, filename[0]+".csv");
      // unlink will delete the excel file once the CSV file is created
      fs.unlink(path.join(__dirname, "../../"+req.file.path), (err)=>{
        console.log(err)
      });

      // parser will seperate the data from csv file and store in the DB
      var parser = parse({delimiter: ','}, function (err, data) {
        data.forEach(function(line) {
          // create country object out of parsed fields
          if(line[4] != "DOB"){
            console.log(line[4])
            var country = { "name" : line[0]
                          , "email" : line[1]
                          , "address" : line[2]
                          , "ph_no" : line[3]
                          , "DOB" : line[4]
                          , "password": line[3]
                          };
                        
            var people = new People({...country})
            people.emailOTP = Math.floor(100000 + Math.random() * 900000);
            people.electionid = electionid
            people.type="voter";
            people.user = user._id;
            people.save().then((data)=>{console.log(data)}).catch((err)=> { console.log(err)})
          }
        });    
      });
      // fs.createReadStream() allows you to open up a readable stream in a very simple manner
      fs.createReadStream(path.join(__dirname, "../../"+filename[0]+".csv"))
        .pipe(parser)
      res.send('Voters List are added')
    }
    catch(error){
      res.json({error: error.message}).status(error.statusCode)
    }
  },
}