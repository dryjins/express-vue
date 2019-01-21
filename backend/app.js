var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const history = require('connect-history-api-fallback')
var session = require('express-session');
var FileStore = require('session-file-store')(session);


BigInt.prototype.toJSON = function () {
  return this.toString();
}; // for big integer, this app uses string.

//var app = express();
var app = module.exports = express();
var routes = require('./routes')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const maxAge = 24 * 60 * 60 * 1000;
app.use(session({
  name: 'server-session-cookie-id',
  secret: 'my express secret',
  saveUninitialized: true,
  resave: true,
  cookie: {maxAge: maxAge}
}));

// current generator storage
app.locals.currentGen = {};
// remove generators if sessions is expired
app.use(function (req, res, next) {
  let sessions = Object.keys(req.app.locals.currentGen);
  sessions.forEach(function (item) {
    if (!(item in req.sessionStore.sessions)) {
      delete req.app.locals.currentGen[item]
    }
  });
  next();
});
// add routes
app.use('/', routes)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// add history-api-fallback for vue routing.
app.use(history());


// module.exports = app;
