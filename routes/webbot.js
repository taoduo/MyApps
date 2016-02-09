var express = require('express');
var router = express.Router();
var jsdom = require("jsdom");
var Crawler = require("js-crawler");
router.get('/', function(req, res, next) {
  new Crawler().configure({depth: 1})
    .crawl("https://apps.carleton.edu/campus/directory/?first_name=Duo", function onSuccess(page) {
      var content = page.content;
      var jsdom = require("jsdom");
      jsdom.env(
        content,
        ["http://code.jquery.com/jquery.js"],
        function (err, window) {
          console.log("My Name:", window.$(".group1 a").text());
        }
      );
      res.send('success');
    });
});
module.exports = router;
