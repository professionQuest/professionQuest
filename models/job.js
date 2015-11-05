var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobSchema = new Schema({
  title: String,
  company: String,
  postDate: String,
  linkToSource: String,
  location: String
});

module.exports = mongoose.model('Job', jobSchema);
