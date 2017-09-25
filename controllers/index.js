'use strict';
const randomstring = require('randomstring');
const UrlData = require('../models/db');


// get request to handle title
exports.index_get = function(req, res) {
    res.render('index', {
        title: 'TinyUrl'
    });
};

// post request to handle url shortening
exports.index_post = function(req, res, next) {

    // regex to check if input is a url for long url of the format https://facebook.com
    let regexp1 = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    let urlmatch1 = req.body.longurl.match(regexp1);

    // regex to chekc if input contains only alphanumeric characters for custom short url
    let regexp2 = /^(?:[a-z0-9A-Z]{0}|[A-Za-z0-9]{7})$/;
    let urlmatch2 = req.body.shorturl.match(regexp2);
    let custom = false;

    if (req.body.shorturl !== '') {
        custom = true;
    }

    if (urlmatch1 !== null && urlmatch2 !== null) {

        let inpx = req.body.longurl,
            inpy = req.body.shorturl;

        //  query to check if short url exits
        let query = UrlData.findOne({ 'longurl': req.body.longurl },
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

                    let items = {
                        longurl: req.body.longurl,
                        shorturl: surl
                    }
                    let data = new UrlData(items);
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
};