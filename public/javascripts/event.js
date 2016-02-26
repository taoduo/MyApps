var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
	id: Number,
	start_date: [],
	end_date: Date,
	text: String,
	place: String,
  details: String
});

module.exports = mongoose.model('Event', eventSchema);
