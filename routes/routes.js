var express = require('express');
var router = express.Router();

// Application
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Profession Quest' });
});

// Login
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

// Register
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

// Edit User
router.get('/edit-user', function(req, res, next) {
  res.render('edit-user', { title: 'Edit User' });
});

module.exports = router;
