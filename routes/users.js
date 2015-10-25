var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));

function requireSession(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
}

// Render Register Page
router.get('/register', function(req, res) {
  res.render('register', { title: 'Register' });
});

// Create User
router.post('/', function(req, res) {
  if (req.body.password !== req.body.confirmation) {
    console.log('Passwords must match');
    res.redirect('/users/register');
  } else {
    var user = new User({
      email: req.body.email,
      password: req.body.password
    });

    user.save(function(err) {
      if (err) res.send(err);

      res.redirect('/login');
    });
  }

});

// Render Edit User Page
router.get('/edit-user', function(req, res) {
  res.render('edit-user', { title: 'Edit User' });
});

module.exports = router;
