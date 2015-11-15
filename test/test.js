var chai = require('chai');
var expect = chai.expect;
var should = chai.should;
var request = require('supertest');
var mongoose = require('mongoose');
var jobs = require('../routes/jobs');
var User = require('../models/user');


// Routes
describe('Routes', function() {
  var url = 'http://localhost:3000'

  before(function(done) {
    mongoose.connect('mongodb://localhost/professionQuest');
    connection = mongoose.connection;

    var user = new User({
      email: 'david@test.com',
      password: '123',
      jobs: []
    });

    user.save(function(err) {
      if (err) console.log(err);

    });
    done();
  });

  after(function(done) {
    connection.db.dropDatabase();
    connection.close();
    done();
  })

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
          .expect(200, done)
      });
    });

    describe('#edit', function() {
      it('should send edit user page for specific user');
    });

    describe('#update', function() {
      it('should update specific user in database');
    });

    describe('#destroy', function() {
      it('should delete specific user from database');
    });

  });

  describe('Application Routes', function() {

    describe('#application', function() {
      it('should send application page');
    });

    describe('#request', function() {
      it('should retrieve and send API data');
    });

  });

  describe('Jobs Routes', function() {

    describe('#index', function() {
      it('should send saved jobs for specific user');
    });

    describe('#create', function() {
      it('should add new job to database for specific user');
    });

    describe('#destroy', function() {
      it('should remove specific job from database for specific user');
    });

  });

});
