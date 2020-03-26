require('./db');
const express = require('express');
const session = require('express-session');
const path = require('path');
const hbs = require('hbs');

const app = express();

const usernormalroutes = require('./routes/normalroutes/usernormalroutes');
const userapiroutes = require('./routes/apiroutes/userapiroutes');

const fileapiroutes = require('./routes/apiroutes/fileapiroutes');

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

app.use(usernormalroutes);
app.use(userapiroutes);

app.use(fileapiroutes);

app.listen(1234);