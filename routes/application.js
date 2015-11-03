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
router.get('/request/:q', function (req, res) {
  
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
    console.log(diceData)
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

  var github = request('https://jobs.github.com/positions.json?search=code&page=1')
    .then(parsingToJSON)
    .then(githubTransformation);
  var dice = request('http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=' + req.params.q)
    .then(parsingToJSON)
    .then(diceTransformation);

  Promise.all([github, dice]).then(function(results) {
    console.log("all the files were created");
    console.log(results);
  });
});

// Application
router.get('/', function(req, res) {
  console.log(req.session.user);
  // console.log('test');

  User.findOne({_id : req.session.user}, function(err, user) {
    if (err) {res.send(err)};
    res.render('index', { title: 'Profession Quest' , user : user });
  })
});


module.exports = router;
