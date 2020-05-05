var createError = require('http-errors');
var express = require('express');
var path = require('path');


var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { httpPoxy } = require("./utils/autoRequest.js");
const jwtAuth = require('./utils/authToken.js');
var userRouter = require('./routes/user.js');
var cinemaUploadRouter = require('./routes/cinemaUpload.js');

var app = express();


app.use(logger('dev'));


app.use(express.static(path.join(__dirname, 'public')));

app.use(jwtAuth);
app.use('/api', httpPoxy);  //头部带api自动转发至4000server


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/user', userRouter);
app.use('/cinema', cinemaUploadRouter);









// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({
      message: 'invalid token',
      error: err
    });
  } else {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  }
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
