var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bodyParser = require('body-parser');
var request = require('request-promise');
var Promise = require("bluebird");

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

  var finalResult = [];

  var github = request('https://jobs.github.com/positions.json?description=' + req.params.q + '&location=' + req.params.city)
    .then(parsingToJSON)
    .then(githubTransformation);
  var dice = request('http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=' + req.params.q + '&city=' + req.params.city)
    .then(parsingToJSON)
    .then(diceTransformation);

  function parsingToJSON(nonParsedData){
    return JSON.parse(nonParsedData)
  }

  function githubTransformation(githubData){
    return githubData.map(function(item){
      var posting = {
        title : item.title,
        company : item.company,
        postDate : new Date(item.created_at),
        linkToSource : item.url
      };
      return posting;
    })
  }

  function diceTransformation(diceData){
    return diceData.resultItemList.map(function(item){
      var posting = {
        title : item.jobTitle,
        company : item.company,
        postDate : new Date(item.date),
        linkToSource : item.detailUrl
      };
      return posting;
    })
  }

  Promise.all([github, dice]).then(function(results) {
    for (var i = 0; i < results.length; i++) {
      finalResult = finalResult.concat(results[i]);
    }
    return finalResult;
  }).then(function(data) {
    res.send(data);
  });

});

// Application
router.get('/', function(req, res) {

  User.findOne({_id : req.session.user}, function(err, user) {
    if (err) {res.send(err)};
    res.render('index', { title: 'Profession Quest' , user : user });
  })
});


module.exports = router;
