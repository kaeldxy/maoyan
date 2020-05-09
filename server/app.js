var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./dao/db.js'); // 链接数据库  数据库名是  maoyan

var userRouter = require('./routes/user.js'); //用户
var cinemaRouter = require('./routes/cinema.js'); // 影院
var theaterRouter = require('./routes/theater.js'); //放映厅
var scheduleRouter = require('./routes/schedule.js'); //排片
var movieRouter = require('./routes/movie.js'); // 电影
var orderRouter = require('./routes/order.js');  //订单
var app = express();




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use('/user', userRouter);
app.use('/cinema', cinemaRouter);
app.use('/schedule', scheduleRouter);
app.use('/theater', theaterRouter);
app.use('/movie', movieRouter);
app.use('/order', orderRouter);



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
