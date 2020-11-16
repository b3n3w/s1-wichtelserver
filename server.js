const express = require('express');
const bodyParser = require('body-parser');
const InitiateMongoServer = require("./backend/db");

// Initiate Mongo DB Server Connection
InitiateMongoServer();


const app = express();

var session = require('express-session'),
  path = require('path');
  
  
  //Store all JS and CSS in Scripts folder.
  app.use(express.static(__dirname + '/frontend'));
  
// Middleware
  app.use(express.json());
  app.use(express.urlencoded());

  var routes = require('./backend/router');
  app.use('/', routes);

//set Session Cookies
app.use(session({
  secret: 'test_secrete',
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 60000
  }
}));

//check if cookie still saved in browser
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');        
  }
  next();
});

//check if user is stil logged in
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
      res.redirect("./view/mainpage.html");
  } else {
      next();
  }    
};


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(process.env.port || 3000);


console.log('Webserver running at Port 3000');