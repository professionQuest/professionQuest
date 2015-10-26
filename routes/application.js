var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bodyParser = require('body-parser');
var request = require('request');

router.use(bodyParser.urlencoded({ extended: false }));

function requireSession(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
}

// Request
router.get('/request/:q', function (req,res) {
	request('http://service.dice.com/api/rest/jobsearch/v1/simple.json?text='+req.params.q, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    res.send(body); // Show the HTML for the Google homepage. 
	  }
	})	
});

// Application
router.get('/', requireSession, function(req, res) {
  res.render('index', { title: 'Profession Quest' });
});

module.exports = router;


