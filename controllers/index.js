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
    	var item = {
    		lurl: req.body.longurl,
    		surl: req.body.shorturl
    	};
    	var data = new UrlData(item);
    	// console.log(data);
    	// console.log(data.lurl);
    	// console.log(data.surl);
    // 	data.save();
  		// res.redirect('/get-data');
    	data.save(function(err, doc){
		if(err){
			res.json(err);
		} 
		else {
			console.log(doc)
			res.json(doc);
		}   
    	// res.redirect('/new-url');
    });

  		// data.save()
    // 	 .then(item => {
    //       res.send(JSON.stringify(item));
    // 	})
    // 	.catch(err => {
    //   		res.status(400).send("unable to save to database");
    // 	});
  },
  },
};