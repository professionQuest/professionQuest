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

// new
router.get('/register', function(req, res) {
  res.render('register', { title: 'Register' });
});

// create
router.post('/', function(req, res) {
  User.findOne({email : req.body.email}, function(err, user) {
    if (!user) {
      if (req.body.password !== req.body.confirmation) {
        req.flash('alert', 'Passwords must match');
        res.redirect('/users/register');
      } else {
        var user = new User({
          email: req.body.email,
          password: req.body.password
        });

        user.save(function(err) {
          if (err) return res.send(err);

          res.redirect('/login');
        });
      }
    } else {
      req.flash('alert', 'That username exists, try another');
      res.redirect('/users/register');
    }
  });
});

// edit
router.get('/:id/edit', requireUser, function(req, res) {
  User.findOne({_id : req.params.id}, function(err, user) {
    if (err) return res.send(err);

    res.render('edit-user', { title: 'Edit User', user:user });
  });
});

// update
router.put('/:id/edit', requireUser, function(req, res) {
  User.findOne({_id : req.params.id}, function(err, user) {
    if (err) return res.send(err);

    if (req.body.password !== req.body.confirmation) {
      req.flash('alert', 'Passwords must match');
      res.redirect('/users/' + req.params.id + '/edit');
    } else {
      if (req.body.password === '') {
        delete req.body.password;
      }
      for (var key in req.body) {
        user[key] = req.body[key];
      }
      user.save(function(err) {
        if (err) return res.send(err);

        res.redirect('/');
      });
    }
  });
});

module.exports = router;
