# E-ballot

<!-- About the Project  -->
E-balllot is based on the online voting system. It's is fully secure to register your votes. It's a REST full API

### __List of Features__
1) Signup(For those who conduct the Election)
2) Email(Sending the Voter username and password, blogs update, election updates, ..)
3) Blogs ( Nominees or voter they can create the blogs to share therir thoughts )
4) News ( Election Authority can create the news regarding the election)
5) Election ( Create the election, sending the election date through email )

### __npm packages__
1) Express
2) nodemailer ( to send mail)
3) multer ( to store the excelfile, images, etc.,)
4) bcryptjs ( to encrypt the secure datas )
5) jsonwebtoken ( for the user Authetization )
6) mongoose ( to connect the database)

### __list of endpoints__
* Crenditals EndPoints
  
  1) POST /signup
  2) POST /otppage
  3) POST /login
  4) POST /userlogin
  5) POST /logout

* Election 

  POST
  1) POST /election
  2) POST /election/update/:electionid
  3) POST /election/delete/:electionid

  GET
  1) GET /election/result/:electionid

* Upload Nominees and Voter List
  
  1) POST /file/:electionid

* Blog 

  1) POST /blog/createblog/:electionid
  2) PATCH /blog/update/:blogid
  3) DELETE /blog/delete/:electionid/:blogid
   * Comment

      1) POST /blog/comment/:blogid
      2) DELETE /blog/:blogid/delete/comment/:commentid

    * Like

      1) POST /blog/like/:blogid
    
  GET
  1) GET /blog/:blogid
  2) GET /election/blog/:electionid

* NEWS

  POST
  1) POST /news/createnews/:electionid
  2) POST /news/updatenews/:electionid
  3) POST /news/deletenews/:electionid

  GET
  1) GET /news/election/:electionid
  2) GET /news/:newsid

* Invitation

  1) POST /file/invitation/:electionid

* Voter

  1) POST /voter/:nomineeid
  
* Profile
  
  1) PATCH /profile/update
