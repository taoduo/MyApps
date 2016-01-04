var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notesSchema = new Schema({
	title: String,
	keywords: [],
	details: String,
	date: Date,
	tag: String
});

module.exports = mongoose.model('Note', notesSchema);