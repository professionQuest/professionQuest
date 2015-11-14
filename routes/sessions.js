var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));

// Render Login Page
router.get('/login', function(req, res) {
  if (req.session.user) {
    res.redirect('/#/')
  } else {
    res.render('login', { title: 'Login' });
  }
});

// Login
router.post('/login', function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) res.send(err);

    if (user === null) {
      // if user does not exist
      req.flash('alert', 'Wrong username or password');
      res.redirect('/login');
    } else {
      // check to see if passwords match (method found in user model)
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (err) {
          return res.send(err);
        }

        if (isMatch) {
          req.session.user = user._id;
          res.redirect('/');
        }

        if (!isMatch) {
          req.flash('alert', 'Wrong username or password');
          res.redirect('/login');
        }
      });
    }
  });
});

// Logout
router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) res.send(err);

    res.redirect('/login');
  });
});

module.exports = router;
