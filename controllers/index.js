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
  },
  },
};