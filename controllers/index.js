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
    	var regexp1 = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    	var urlmatch1 = req.body.longurl.match(regexp1);

    	var regexp2 = /^[A-Za-z0-9_]{7}$/;
    	var urlmatch2 = req.body.shorturl.match(regexp2);

    	if (urlmatch1 !=null && urlmatch2 !=null) {
    		var data = new UrlData({
    		longurl: req.body.longurl,
    		shorturl: req.body.shorturl
    		});

    	data.save(function(err, doc){
		if(err){
			res.json(err);
		} 
		else {
			console.log(doc);
			res
			res.render("new-url",{
				title: "TinyUrl",
				longurl: req.body.longurl,
				shorturl: req.body.shorturl
			});
		}   
    });
    	} else {
    		if (urlmatch1 == null) {
    			res.send("Enter complete long url e.g. https://www.regex101.com/")
    		} else {
    			res.send("Short URL must be 7 characters long and it must carry only A-Za-z0-9_");
    		}
    		
    	}
    	
  },
  },
};