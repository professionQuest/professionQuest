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
router.get('/request/:q/:city', function (req, res) {
	request('http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=' + req.params.q + '&city=' + req.params.city, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var result = JSON.parse(body);
      res.send(result.resultItemList);
	  }
	});
});

// Application
router.get('/', requireSession, function(req, res) {
  console.log(req.session.user);
  console.log('test');

  User.findOne({_id : req.session.user}, function(err, user) {
    if (err) {res.send(err)};
    res.render('index', { title: 'Profession Quest' , user : user });
  })
});


module.exports = router;
