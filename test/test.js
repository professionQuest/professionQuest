var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var mongoose = require('mongoose');
var jobs = require('../routes/jobs');
var User = require('../models/user');

// Routes
describe('Routes', function() {
  var url = 'http://localhost:3000'
  var testUserId;
  var testJobId;

  before(function(done) {

    mongoose.connect('mongodb://localhost/professionQuest');
    connection = mongoose.connection;

    var user = new User({
      email: 'david@test.com',
      password: '123',
      jobs: []
    });

    var job = {
      title: 'job',
      company: 'company',
      linkToSource: 'http://jobsite.com/',
      postDate: '10/25/2015',
      location: 'Portland, OR'
    };

    user.jobs.push(job);

    user.save(function(err) {
      if (err) console.log(err, user);
      testUserId = user._id;
      testJobId = user.jobs[0]._id
      done();
    });

  });

  after(function(done) {
    connection.db.dropDatabase();
    connection.close();
    done();
  });

  describe('Sessions Routes', function() {

    describe('#render login', function() {
      it('should send login page', function(done) {
        request(url)
          .get('/login')
          .expect(200, done);
      });
    });

    describe('#login', function() {
      var credentials = {
        email: 'david@test.com',
        password: '123'
      };

      it('should authenticate user', function(done) {
        request(url)
          .post('/login')
          .send(credentials)
          .expect(302, done);
      });
    });

    describe('#logout', function() {
      it('should delete user session', function(done) {
        request(url)
          .get('/logout')
          .expect(302, done);
      });
    });

  });

  describe('Users Routes', function() {

    describe('#new', function() {
      it('should send register user page', function(done) {
        request(url)
          .get('/users/register')
          .expect(200, done);
      });
    });

    describe('#create', function() {

      it('should add new user to database', function(done) {
        var profile = {
          email: 'test@test.com',
          password: 'test'
        }

        request(url)
          .post('/users')
          .send(profile)
          .expect(200, done);
      });
    });

    describe('#edit', function() {
      it('should send edit user page for specific user', function(done) {
        request(url)
          .get('/users/' + testUserId + '/edit')
          .expect(302, done);
      });
    });

    describe('#update', function() {
      it('should update specific user in database', function(done) {
        var email = {
          email: 'update@test.com'
        }

        request(url)
          .put('/users/' + testUserId + '/edit')
          .send(email)
          .expect(302, done);
      });
    });
  });

  describe('Application Routes', function() {

    describe('#application', function() {
      it('should send application page', function(done) {
        request(url)
          .get('/')
          .expect(302, done);
      });
    });

    describe('#request', function() {
      it('should retrieve and send API data', function(done) {
        request(url)
          .get('/request/java/portland')
          .expect(302, done);
      });
    });

  });

  describe('Jobs Routes', function() {

    describe('#index', function() {
      it('should send saved jobs for specific user', function(done) {
        request(url)
          .get('/users/' + testUserId + '/jobs')
          .expect(302, done);
      });
    });

    describe('#create', function() {
      it('should add new job to database for specific user', function(done) {
        var job = {
          title: 'some job',
          company: 'some company',
          linkToSource: 'http://jobsite.com/',
          postDate: '10/15/2015',
          location: 'Portland, OR'
        }

        request(url)
          .post('/users/' + testUserId + '/jobs/new')
          .send(job)
          .expect(302, done);
      });
    });

    describe('#destroy', function() {
      it('should remove specific job from database for specific user', function(done) {
        request(url)
          .delete('/users/' + testUserId + '/jobs/' + testJobId)
          .expect(302, done);
      });
    });

  });

});
