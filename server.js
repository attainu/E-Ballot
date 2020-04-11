require('./db');
// Npm packages
const express = require('express');

const app = express();
// third party
const userapiroutes = require('./routes/apiroutes/userapiroutes');

const fileapiroutes = require('./routes/apiroutes/fileapiroutes');
const emailapiroutes = require('./routes/apiroutes/emailapiroutes');
const blogapiroutes = require('./routes/apiroutes/blogapiroutes');
const likeapiroutes = require('./routes/apiroutes/likeapiroutes');
const commentapiroutes = require('./routes/apiroutes/commentapiroutes');
const electionapiroutes = require('./routes/apiroutes/electionapiroutes');
const newsapiroutes = require('./routes/apiroutes/newsapiroutes');
const voteapiroutes = require('./routes/apiroutes/voteapiroutes');
const profileapiroutes = require('./routes/apiroutes/profileapiroutes');

const blognormalroutes = require('./routes/normalroutes/blognormalroutes');
const newsnormalroutes = require('./routes/normalroutes/newsnormalroutes');
const electionnormalroutes = require('./routes/normalroutes/electionnormalroutes');

var PORT = process.env.PORT || 1234;
// Used for the getting the input in a jspn format
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(userapiroutes);

app.use(fileapiroutes);
app.use(emailapiroutes);
app.use(blogapiroutes);
app.use(likeapiroutes);
app.use(commentapiroutes);
app.use(electionapiroutes);
app.use(newsapiroutes);
app.use(voteapiroutes);
app.use(profileapiroutes);

app.use(blognormalroutes);
app.use(newsnormalroutes);
app.use(electionnormalroutes);

app.listen(PORT, ()=>{
  console.log(`Server Running on ${PORT}`)
});