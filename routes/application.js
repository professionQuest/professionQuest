var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bodyParser = require('body-parser');
var request = require('request-promise');
var Promise = require("bluebird");

router.use(bodyParser.urlencoded({ extended: false }));

// require a user to be logged in
function requireSession(req, res, next) {
  if (!req.session.user) {
    req.flash('alert', 'Not Authorized');
    res.redirect('/login');
  } else {
    next();
  }
}

// application
router.get('/', requireSession, function(req, res) {

  User.findOne({_id : req.session.user}, function(err, user) {
    if (err) return res.send(err);
    res.render('index', { title: 'Profession Quest' , user : user });
  })
});

// request
router.get('/request/:q/:city', requireSession, function(req, res) {

  var usaJobs = request('https://data.usajobs.gov/api/jobs?keyword=' + req.params.q + '&locationID=' + req.params.city)
    .then(parsingToJSON)
    .then(usaJobsTransformation);
  var github = request('https://jobs.github.com/positions.json?description=' + req.params.q + '&location=' + req.params.city)
    .then(parsingToJSON)
    .then(githubTransformation);
  var dice = request('http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=' + req.params.q + '&city=' + req.params.city)
    .then(parsingToJSON)
    .then(diceTransformation);

  function parsingToJSON(nonParsedData) {
    return JSON.parse(nonParsedData)
  }

  function usaJobsTransformation(usaJobsData) {
    if (usaJobsData.JobData) {
      return usaJobsData.JobData.map(function(item) {
        var posting = {
          title : item.JobTitle,
          company : item.OrganizationName,
          postDate : new Date(item.StartDate).getTime() / 1000,
          linkToSource : item.ApplyOnlineURL,
          location : 'USA'
        };
        return posting;
      })
    } else {
      return [];
    }
  }

  function githubTransformation(githubData) {
    if (githubData) {
      return githubData.map(function(item) {
        var posting = {
          title : item.title,
          company : item.company,
          postDate : new Date(item.created_at).getTime() / 1000,
          linkToSource : item.url,
          location : item.location
        };
        return posting;
      })
    } else {
      return [];
    }
  }

  function diceTransformation(diceData) {
    if (diceData.resultItemList) {
      return diceData.resultItemList.map(function(item) {
        var posting = {
          title : item.jobTitle,
          company : item.company,
          postDate : new Date(item.date).getTime() / 1000,
          linkToSource : item.detailUrl,
          location : item.location
        };
        return posting;
      })
    } else {
      return [];
    }
  }

  Promise.all([usaJobs, github, dice]).then(function(results) {
    var newResult = [];

    for (var i = 0; i < results.length; i++) {
      newResult = newResult.concat(results[i]);
    }
    return newResult;

  }).then(function(newResult) {
    var newResult = newResult.sort(function(a, b) {
      return b.postDate - a.postDate;
    });
    return newResult;

  }).then(function(newResult) {
    res.send(newResult);
  });

});


module.exports = router;
