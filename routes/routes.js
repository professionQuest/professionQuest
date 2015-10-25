var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));

// Application
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Profession Quest' });
});

// Login
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

// Render Register Page
router.get('/users/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

// Create User
router.post('/users', function(req, res) {

  var user = new User({
    email: req.body.email,
    password: req.body.password
  });

  user.save(function(err) {
    if (err) res.send(err);

    console.log('User saved');
  });
})

// Render Edit User Page
router.get('/user/edit-user', function(req, res, next) {
  res.render('edit-user', { title: 'Edit User' });
});


router.post('/login', function(req, res, next) {
  res.render('index', { title: 'Hello' });
});

module.exports = router;
