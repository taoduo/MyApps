var express = require('express');
var router = express.Router();
var Note = require(__dirname + '/../public/javascripts/note_model.js');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('newnotes');
});

router.post('/', function(req, res, next) {
	var details = req.body.details;
	var title = req.body.title;
	var keywords = req.body.keywords;
	var tag = req.body.tag;
	var date = new Date();
	var regex = new RegExp('[，,] ?');
	var newNote = new Note({
		title: title,
		keywords: keywords.split(regex),
		details: details,
		date: date,
		tag: tag,
	});
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function(callback) {
		newNote.save(function (err, data) {
			if (err) {
				console.log(err);
			} else {
				mongoose.connection.close();
				console.log('Saved : ', data);
				mongoose.disconnect();
			}
      res.end();
		});
	});
});
module.exports = router;
