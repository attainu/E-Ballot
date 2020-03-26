const Nominee = require('../../model/Nominees');
const Voter = require('../../model/Voter');
const XLSX = require('xlsx');
const path = require('path')
const fs = require('fs');
const parse = require('csv-parse');

module.exports = {
  nomineesfileupload: (req, res, next)=>{
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
          var country = { "name" : line[0]
                        , "email" : line[1]
                        , "address" : line[2]
                        , "ph_no" : line[3]
                        , "DOB" : line[4]
                        , "password": line[3]
                        };
                      
          var nominee = new Nominee({...country})
          nominee.emailOTP = Math.floor(100000 + Math.random() * 900000);
          nominee.save().then((data)=>{console.log(data)}).catch((err)=> { console.log(err)})
        });    
      });
      // fs.createReadStream() allows you to open up a readable stream in a very simple manner
      fs.createReadStream(path.join(__dirname, "../../"+filename[0]+".csv"))
        .pipe(parser)
      res.send('Done')
  },

  voterfileupload: (req, res, next)=>{
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
        var country = { "name" : line[0]
                      , "email" : line[1]
                      , "address" : line[2]
                      , "ph_no" : line[3]
                      , "DOB" : line[4]
                      , "password": line[3]
                      };
                    
        var voter = new Voter({...country})
        voter.emailOTP = Math.floor(100000 + Math.random() * 900000);
        voter.save().then((data)=>{console.log(data)}).catch((err)=> { console.log(err)})
      });    
    });
    // fs.createReadStream() allows you to open up a readable stream in a very simple manner
    fs.createReadStream(path.join(__dirname, "../../"+filename[0]+".csv"))
      .pipe(parser)
    res.send('Done')
  }
}