var chai = require('chai');
var expect = chai.expect;

// Routes

describe('Application Routes', function() {
  describe('#application', function() {
    it('should send application page', function() {

    });
  });
  describe('#request', function() {
    it('should retrieve and send API data', function() {

    });
  });
});

describe('Jobs Routes', function() {
  describe('#index', function() {
    it('should send saved jobs for specific user', function() {

    });
  });
  describe('#create', function() {
    it('should add new job to database for specific user', function() {

    });
  });
  describe('#destroy', function() {
    it('should remove specific job from database for specific user', function() {

    });
  });
});

describe('Sessions Routes', function() {
  describe('#login', function() {
    it('should authenticate user and create session if credentials match', function() {

    });
  });
  describe('#logout', function() {
    it('should delete user session', function() {

    });
  });
});

describe('Users Routes', function() {
  describe('#new', function() {
    it('should send register user page', function() {

    });
  });
  describe('#create', function() {
    it('should add new user to database', function() {

    });
  });
  describe('#edit', function() {
    it('should send edit user page for specific user', function() {

    });
  });
  describe('#update', function() {
    it('should update specific user in database', function() {

    });
  });
  describe('#destroy', function() {
    it('should delete specific user from database', function() {

    });
  });
});
