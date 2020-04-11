const People = require('../model/People');

module.exports = {
  async checkEmail(data, electionid){
    for(var i = 1; i < data.length; i++){
      var peopleregister = await People.findOne({email: data[i][1], electionid: electionid})
      if(peopleregister){
        return true
      }
    }
  },

  async checkPhone(data, electionid){
    for(var i = 1; i < data.length; i++){
      var peopleregister = await People.findOne({ph_no: data[i][3], electionid: electionid})
      if(peopleregister){
        return true
      }
    }
  },

  async isvalidNumber(data){
    for(var i = 1; i < data.length; i++){
      var checknumber = data[i][3].split("");
      if(checknumber.length !== 10){
        return false
      }
    }
  }
}