const { Router } = require('express');
const autheticate = require('../../middleware/autheticate');
const router = Router();

const usernormalcontroller = require('../../controllers/normalcontrollers/usernormalcontroller');


router.get('/login', usernormalcontroller.renderloginpage);

router.get('/signup', usernormalcontroller.rendersignuppage);

router.get('/otppage/:userid',autheticate, usernormalcontroller.renderotppage);

router.get('/comission/', autheticate, function(req, res){
  var formString = `
  <label>Nomiees</label>
  <form enctype="multipart/form-data" action="/nominees" method="POST">
    <input type="file" name="fileUpload"/>
    <input type="submit" value="upload"/>
  </form>
  <label>Voter</label>
  <form enctype="multipart/form-data" action="/voter" method="POST">
    <input type="file" name="voterfileUpload"/>
    <input type="submit" value="upload"/>
  </form>
  `;
  res.send(formString);
});

module.exports = router;


