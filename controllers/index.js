'use strict';
var randomstring = require('randomstring');
var UrlData = require('../models/db');

module.exports = {
    index: {
        get(req, res) {
            res.render('index', {
                title: 'TinyUrl'
            });
        },

        post(req, res, next) {
            // regex to check if input is a url for long url of the format https://facebook.com
            var regexp1 = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            var urlmatch1 = req.body.longurl.match(regexp1);
            // regex to chekc if input contains only alphanumeric characters for custom short url
            var regexp2 = /^(?:[a-z0-9A-Z]{0}|[A-Za-z0-9]{7})$/;
            var urlmatch2 = req.body.shorturl.match(regexp2);
            var custom = false;

            if (req.body.shorturl !== '') {
                custom = true;
            }

            if (urlmatch1 !== null && urlmatch2 !== null) {

                var inpx = req.body.longurl,
                    inpy = req.body.shorturl;

                //  query to check if short url exits
                var query = UrlData.findOne({ 'longurl': req.body.longurl },
                    function(err, doc) {
                        if (err) {
                            res.send(err)
                        }

                        if (doc === null) {

                            // create short links
                            if (custom === true) {
                                var surl = req.body.shorturl;
                            } else {
                                var surl = randomstring.generate({
                                    length: 7,
                                    charset: 'alphanumeric'
                                });
                            }

                            var items = {
                                longurl: req.body.longurl,
                                shorturl: surl
                            }
                            var data = new UrlData(items);
                            inpy = items.shorturl;
                            data.save();
                        } else {
                            inpy = doc.shorturl;

                        }

                        // res.redirect('http://google.com');

                        res.render('new-url', {
                            title: 'TinyUrl',
                            longurl: req.body.longurl,
                            shorturl: inpy
                        });
                    });

            } else {
                if (urlmatch1 === null) {
                    res.send('Enter complete long url e.g. https://www.regex101.com/')
                } else if (urlmatch2 === null) {
                    res.send('Short URL must be 7 characters long and it must carry only A-Za-z0-9');
                }

            }

        },
    },
};