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
router.get('/request/:q', function (req, res) {
  // var searchResultsArray = [];
  //dice
	// request('http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=' + req.params.q, function (error, response, body) {
	//   if (!error && response.statusCode == 200) {
	//     var result = JSON.parse(body);
 //      // res.send(result.resultItemList);
 //      searchResultsArray.concat(result.resultItemList);
	//   }
 //  });

  //github 
  request('https://jobs.github.com/positions.json?search=code&page=1', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var result = JSON.parse(body);
        console.log(result[1]);
//[]  pull keys we want
//[]  change keys to keys we want
//[]  add to array
//[]  sort into order we want


        // res.send(result);
        // searchResultsArray.concat(result);
    }
  });


  // request('http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=' + req.params.q, function (error, response, body) 
  // {
  //   if (!error && response.statusCode == 200) 
  //   {
  //     var result = JSON.parse(body);
  //     // res.send(result.resultItemList);
  //     var newArray1 = searchResultsArray.concat(result.resultItemList);
  //   }
  // });

  // function github(searchResultsArray) {
  //   // request
  //     if (!error && response.statusCode == 200) {
  //       // concat array
  //       sendRequest(searchResultsArray);
  //     }
  // }

  // function sendRequest(searchResultsArray) {
  //   res.send(newArray1);
  // }
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
