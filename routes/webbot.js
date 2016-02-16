var express = require('express');
var router = express.Router();
var jsdom = require("jsdom");
var Crawler = require("js-crawler");
router.get('/', function(req, res, next) {
  var input;
  new Crawler().configure({
      depth: 1
    })
    .crawl("https://apps.carleton.edu/career/students/networking/search/?city=Minneapolis&state=MN&affiliation=alum", function onSuccess(page) {
      var content = page.content;
      var jsdom = require("jsdom");
      jsdom.env(
        content, ["http://code.jquery.com/jquery.js"],
        function(err, window) {
          window.$('#usernameLoginInput').val('taod');
          window.$('#passwordLoginInput').val('Bonanza2015');
          var form = window.$(".loginForm form");
          var data = form.serialize();
          var url = form.attr('action') || 'get';
          var type = form.attr('enctype') || 'application/x-www-form-urlencoded';
          var method = form.attr('method');

          $.post({
            url: url,
            method: method.toUpperCase(),
            body: data,
            headers: {
              'Content-type': type
            },
            success: function(error, response, body) {
            // this assumes no error for brevity.
              var newDoc = jsdom.env(body, [ "http://code.jquery.com/jquery.js" ], function(errors, window) {
                console.log(body);
              });
            }
          });
        }
      );
      res.send('success');
    });
});
module.exports = router;
