var express = require('express');
var router = express.Router();
var Note = require(__dirname + '/../public/javascripts/note_model.js');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.login) {
    res.render('newnotes', {login:true});
  } else {
    res.render('newnotes', {login:false});
  }
});

router.post('/', function(req, res, next) {
  if(req.session.login){
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
		newNote.save(function (err, data) {
			if (err) {
				console.log(err);
			} else {
				console.log('Saved : ', data);
			}
      res.end('success');
		});
  } else {
    res.end('Only Duo can write new notes.');
  }
});
module.exports = router;
