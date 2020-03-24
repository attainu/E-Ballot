module.exports={
  renderloginpage(_, res){
    res.render('login')
  },

  rendersignuppage(_,res){
    res.render('register')
  },
  
  renderotppage(_, res){
    
    res.render('otppage', {
      userid: _.params.userid
    })
  }
}