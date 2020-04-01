require('./db');
require('./utils/hbs');

const express = require('express');
const session = require('express-session');
const path = require('path');
const hbs = require('hbs');
const methodOverride = require('method-override');
const app = express();

const usernormalroutes = require('./routes/normalroutes/usernormalroutes');
const userapiroutes = require('./routes/apiroutes/userapiroutes');

const fileapiroutes = require('./routes/apiroutes/fileapiroutes');
const emailapiroutes = require('./routes/apiroutes/emailapiroutes');
const blogapiroutes = require('./routes/apiroutes/blogapiroutes');
const likeapiroutes = require('./routes/apiroutes/likeapiroutes');
const commentapiroutes = require('./routes/apiroutes/commentapiroutes');
const electionapiroutes = require('./routes/apiroutes/electionapiroutes');
const newsapiroutes = require('./routes/apiroutes/newsapiroutes');
const voteapiroutes = require('./routes/apiroutes/voteapiroutes');

const blognormalroutes = require('./routes/normalroutes/blognormalroutes');
const newsnormalroutes = require('./routes/normalroutes/newsnormalroutes');
const electionnormalroutes = require('./routes/normalroutes/electionnormalroutes');

app.use(express.static(path.join(__dirname, 'static')))

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views", "partials"));

app.use(
  session({
    secret: "EballotAPIexpressappsecret",
    resave: false,
    name: "EBallotSession",
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 30,
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    }
  })
);

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("httpmethod"));

app.use(usernormalroutes);
app.use(userapiroutes);

app.use(fileapiroutes);
app.use(emailapiroutes);
app.use(blogapiroutes);
app.use(likeapiroutes);
app.use(commentapiroutes);
app.use(electionapiroutes);
app.use(newsapiroutes);
app.use(voteapiroutes);

app.use(blognormalroutes);
app.use(newsnormalroutes);
app.use(electionnormalroutes);

app.listen(1234);