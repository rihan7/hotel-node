const express = require('express');
const router = express.Router();
const passport = require('passport');

// const User = require('../model/User');
const { ErrorHandler } = require('../utility/errors');


router.get('/signup', async (req, res, next) => {
  res.render('./auth/signup');

});

// router.post('/signup', async (req, res) => {
//   const { username, password } = req.body;
//   const newUser = new User({ username: username })
//   User.register(newUser, password, function (err, account) {
//     if (err) {
//       return res.render('./auth/signup');
//     }
//     passport.authenticate("local")(req, res, function () {
//       res.redirect('/');
//     });
//   });
// });

router.get('/signin', async (req, res, next) => {
  res.render('./auth/signin');
});


router.post('/signin', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      throw new ErrorHandler(401, 'Email or Password Invalid')
    }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});


router.get('/signout', (req, res, next) => {
  req.logOut();
  res.redirect('/users/signin');
})

module.exports = router;
