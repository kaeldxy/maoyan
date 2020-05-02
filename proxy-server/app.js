var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { httpPoxy } = require("./utils/autoRequest.js");

var adminUserRouter = require('./routes/adminUser.js');
var frontUserRouter = require('./routes/frontUser.js');

var app = express();


app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', httpPoxy);  //头部带api自动转发至4000server


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/adminUser', adminUserRouter);
app.use('/frontUser', frontUserRouter);








// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
