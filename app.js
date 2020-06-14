const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const app = express();
const methodOverride = require('method-override')

const User = require('./model/User');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


mongoose.connect('mongodb+srv://taher:taher.db@cluster0-o7f5u.mongodb.net/hotel',
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('Database Connected'))
  .catch(() => console.log('Error in Database Connection'))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use((req, res, next) => {
  res.setHeader('Access-control-Allow-Origin', '*');
  res.setHeader(
    'Access-control-Allow-Headers',
    'Origin, X-requested-with, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  next();
})

app.use(require('express-session')({
  secret: 'secret key for server',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//handling delete route 
app.use((req, res, next) => {
  if (req.query._method == 'DELETE') {
    req.method = 'DELETE';
    req.url = req.path;
  }
  next();
})

app.use((req, res, next) => {
  res.locals.currentUser = req.isAuthenticated();
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message || 'Something Wrong';
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.url = req.header('Referer');
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
