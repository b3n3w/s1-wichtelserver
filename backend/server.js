const express = require('express');
const bodyParser = require('body-parser');
const InitiateMongoServer = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
var dotenv = require('dotenv').config();
var router = require('./api/routes/router');
var userRouter = require('./api/routes/user')
var groupRouter = require('./api/routes/group')
var giftRouter = require('./api/routes/gift')
var uploadRouter = require('./api/routes/upload');
const { infoLog } = require('./api/helper/logging');


// Initiate Mongo DB Server Connection
InitiateMongoServer();


const app = express();

const corsOptions = {
  origin: 'https://s1-wichtelserver.vercel.app/', // Replace this with the specific URL you want to allow
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// configire morgan
app.use(morgan("combined"));


// Custom CORS error handling middleware
app.use((err, req, res, next) => {
  if (err.name === 'CorsError') {
    console.error('CORS Error:', err.message);
    res.status(403).json({ error: 'CORS Error' });
  } else {
    next(err);
  }
});

// Middleware

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json());

app.use('/api', router);
app.use('/user', userRouter);
app.use('/group', groupRouter);
app.use('/gift', giftRouter)
app.use('/upload', uploadRouter)


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
infoLog("Webserver running at Port 3000 \n")