var chai = require('chai');
var expect = chai.expect;
var request = require('supertest')
var mongoose = require('mongoose');
var jobs = require('../routes/jobs');

var app = require('../app');

// Routes
describe('Routes', function() {

  // before(function() {
  //   mongoose.connect('localhost/professionQuest');
  // });

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

  describe('Sessions Routes', function() {

    describe('#render login', function() {
      it('should send login page', function(done) {
        request(app)
          .get('/login')
          .expect(200, done);
      });
    });

    describe('#login', function() {
      it('should authenticate user');
    });

    describe('#logout', function() {
      it('should delete user session');
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
      it('should add new user to database');
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

});
