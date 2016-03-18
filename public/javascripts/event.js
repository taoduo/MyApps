//this is the data base template for an event
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
	start: Date,
	end: Date,
	title: String,
	place: String,
  details: String
});

module.exports = mongoose.model('Event', eventSchema);
