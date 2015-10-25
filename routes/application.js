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

// Application
router.get('/', requireSession, function(req, res) {
  res.render('index', { title: 'Profession Quest' });
});

module.exports = router;
