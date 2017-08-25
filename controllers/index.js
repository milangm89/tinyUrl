'use strict';

var UrlData = require('../models/db');

module.exports = {
  index: {
    get(req, res) {
      res.render('index',{
      	title: "TinyUrl"
      });
    },

    post(req,res,next) {
    	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    	var urlmatch = req.body.longurl.match(regexp);

    	if (urlmatch !=null) {
    		var data = new UrlData({
    		longurl: req.body.longurl,
    		shorturl: req.body.shorturl
    		});

    	data.save(function(err, doc){
		if(err){
			res.json(err);
		} 
		else {
			console.log(doc)
			res.json(doc);
		}   
    });
    	} else {
    		res.send("Enter complete url e.g. https://www.regex101.com/")
    	}
    	
  },
  },
};