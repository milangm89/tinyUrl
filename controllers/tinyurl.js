let UrlData = require('../models/db');

exports.index_get = function(req, res) {
    //    var mapurl;
    var query = UrlData.findOne({ 'shorturl': req.params.url },
        function(err, doc) {
            if (err) {
                return (err)
            }
            console.log(req.params);
            console.log(doc);
            console.log(doc.longurl);
            var mapurl = doc.longurl;
            console.log("Reditecing to " + mapurl);
            res.redirect(mapurl);
        });

};