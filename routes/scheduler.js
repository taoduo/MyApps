var express = require('express');
var router = express.Router();
var Note = require(__dirname + '/../public/javascripts/note_model.js');
var mongoose = require('mongoose');

router.get('/', function(req, res, next) {
  if(req.session.login) {
    res.render('scheduler', {login:true});
  } else {
    res.render('scheduler', {login:false});
  }
});
module.exports = router;
