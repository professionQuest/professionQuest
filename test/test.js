var chai = require('chai');
var expect = chai.expect;
var request = require('supertest-session');
var mongoose = require('mongoose');
var jobs = require('../routes/jobs');
var User = require('../models/user');
var app = require('../app');

// Routes
describe('Routes', function() {
  var testUserId;
  var testJobId;
  var connection;
  var TEST_EMAIL = 'david@test.com';
  var TEST_PASSWORD = '123';
  var credentials = {
    email: TEST_EMAIL,
    password: TEST_PASSWORD
  };

  var createSession = function(done) {
    user = request(app);
    user
      .post('/login')
      .type('form')
      .send(credentials)
      .expect(302, done);
  };

  before(function(done) {

    connection = mongoose.createConnection('mongodb://localhost/professionQuest');

    var user = new User(credentials);

    var job = {
      title: 'job',
      company: 'company',
      linkToSource: 'http://jobsite.com/',
      postDate: '10/25/2015',
      location: 'Portland, OR'
    };

    user.jobs.push(job);

    user.save(function(err, user) {
      if (err) return done(err);
      testUserId = user._id;
      testJobId = user.jobs[0]._id;
      done();
    });

  });

  after(function(done) {
    // drop db and close connection
    connection.db.dropDatabase();
    connection.close();
    done();
  });

  describe('Sessions Routes', function() {

    describe('#render login', function() {
      it('should send login page', function(done) {
        request(app)
          .get('/login')
          .expect(200, done);
      });
    });

    describe('#login', function() {
      var credentials = {
        email: TEST_EMAIL,
        password: TEST_PASSWORD
      };

      it('should authenticate user', function(done) {
        request(app)
          .post('/login')
          .send(credentials)
          .expect(302, done);
      });
    });

    describe('#logout', function() {

      beforeEach(createSession);

      it('should delete user session', function(done) {
        user
          .get('/logout')
          .expect(302, done);
      });
    });

  });

  describe('Users Routes', function() {

    describe('#new', function() {
      it('should send register user page', function(done) {
        request(app)
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

        request(app)
          .post('/users')
          .send(profile)
          .expect(200, done);
      });
    });

    describe('#edit', function() {

      beforeEach(createSession);

      it('should send edit user page for specific user', function(done) {
        user
          .get('/users/' + testUserId + '/edit')
          .expect(200, done);
      });
    });

    describe('#update', function() {

      beforeEach(createSession);

      it('should update specific user in database', function(done) {
        var email = {
          email: 'update@test.com'
        };

        user
          .put('/users/' + testUserId + '/edit')
          .send(email)
          .expect(302, done);
      });
    });
  });

  describe('Application Routes', function() {

    describe('#application', function() {

      beforeEach(createSession);

      it('should send application page', function(done) {
        user
          .get('/')
          .expect(200, done);
      });
    });

    describe('#request', function() {

      beforeEach(createSession);

      it('should retrieve and send API data', function(done) {
        user
          .get('/request/java/portland')
          .expect(200, done);
      });
    });

  });

  describe('Jobs Routes', function() {

    describe('#index', function() {

      beforeEach(createSession);

      it('should send saved jobs for specific user', function(done) {
        user
          .get('/users/' + testUserId + '/jobs')
          .expect(200, done);
      });
    });

    describe('#create', function() {

      beforeEach(createSession);

      it('should add new job to database for specific user', function(done) {
        var job = {
          title: 'some job',
          company: 'some company',
          linkToSource: 'http://jobsite.com/',
          postDate: '10/15/2015',
          location: 'Portland, OR'
        }

        user
          .post('/users/' + testUserId + '/jobs/new')
          .send(job)
          .expect(200, done);
      });
    });

    describe('#destroy', function() {

      beforeEach(createSession);

      it('should remove specific job from database for specific user', function(done) {
        user
          .delete('/users/' + testUserId + '/jobs/' + testJobId)
          .expect(200, done);
      });
    });

  });

});
