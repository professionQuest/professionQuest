var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

router.use(bodyParser.urlencoded({ extended: false }));

// update appropriate methods from html
router.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

// require a specific user to be logged in
function requireUser(req, res, next) {
  if (req.session.user !== req.params.id) {
    req.flash('alert', 'Not Authorized');
    res.redirect('/');
  } else {
    next();
  }
}

// index
router.get('/:id/jobs', requireUser, function(req, res) {
  User.findOne({ _id: req.params.id }, function(err, user) {
    if (err) return res.send(err);

    res.send(user.jobs);
  });
});

// new
router.post('/:id/jobs/new', requireUser, function(req, res) {
  User.findOne({ _id: req.params.id }, function(err, user) {
    if (err) return res.send(err);

    var job = {
      title: req.body.title,
      company: req.body.company,
      linkToSource: req.body.linkToSource,
      postDate: req.body.postDate,
      location: req.body.location
    }

    user.jobs.push(job);

    user.save(function(err) {
      if (err) return res.send(err);
      
      res.send({});
    });
  });
});

// destroy
router.delete('/:id/jobs/:jobId', requireUser, function(req, res) {
  User.findOne({ _id: req.params.id }, function(err, user) {
    if (err) return res.send(err);

    user.jobs.id(req.params.jobId).remove();

    user.save(function(err) {
      if (err) return res.send(err);

      res.send({});
    });
  });
});

module.exports = router;
