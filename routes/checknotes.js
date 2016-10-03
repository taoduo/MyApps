var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Note = require(__dirname + '/../public/javascripts/note_model.js');
//to show all notes
router.get('/', function(req, res, next) {
		Note.find({}, function(err, notes) {
			if(err) {
				console.log('error in query:' + err);
				return;
			}
			notes = notes.reverse();
      if(req.session.login) {
			  res.render('checknotes', {notes:notes, login:true});
      } else {
        res.render('checknotes', {notes:notes, login:false});
      }
		}).sort('date');
});

//to update a note
router.post('/', function(req, res, next) {
  if(req.session.login) {
  	var details = req.body.details;
  	var title = req.body.title;
  	var keywords = req.body.keywords;
  	var tag = req.body.tag;
  	var date = new Date();
  	var regex = new RegExp('[，,] ?');
  	var regex1 = new RegExp('\(#([^)]+)\)');
  	var matches = regex1.exec(req.body.id);
  	var id = matches[2];
		Note.findById(id, function (err, note) {
			if (err) {
				mongoose.connection.close();
				console.log(err);
				return;
			} else {
				note.date = date;
				note.details = details;
				note.keywords = keywords.split(regex);
				note.tag = tag;
				note.title = title;
				note.save(function(err){
					if(err){
						console.log(err);
						return;
					} else {
						res.send(note);
					}
				});
			}
		});
  } else {
    res.end('Only Duo can change his notes.');
  }
});
//to delete a note
router.delete('/', function(req, res, next) {
  if(req.session.login) {
		Note.remove({'_id': req.body.id}, function(err) {
			if(err) {
				console.log(err);
				res.send('err');
				return;
			}
			res.send('deleted');
		});
  } else {
    res.send('Only Duo can delete his note.')
  }
});

// get the data
router.post('/getdata', function(req, res, next) {
	Note.find({}, function(err, notes) {
		if(err) {
			console.log('error in query:' + err);
			return;
		}
		notes = notes.reverse();
		res.end(JSON.stringify(notes));
	}).sort('date');
});
module.exports = router;
