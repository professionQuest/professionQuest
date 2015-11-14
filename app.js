var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('connect-flash');

var application = require('./routes/application');
var sessions = require('./routes/sessions');
var users = require('./routes/users');
var jobs = require('./routes/jobs');

var app = express();

app.use(favicon(__dirname + '/public/images/favicon.ico'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// database
// mongoose.connect('mongodb://localhost/professionQuest');
mongoose.connect(process.env.DBURL);


// middleware
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
  // to use secure cookies use https and update code
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(function(req, res, next) {
  // set session and flash info to locals
  res.locals.alert = req.flash('alert');
  res.locals.notice = req.flash('notice');
  res.locals.session = req.session;
  next();
});

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', application);
app.use('/', sessions);
app.use('/users', users);
app.use('/users', jobs);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
