let UrlData = require('../models/db');

module.exports = {
    index: {
        get(req, res) {
            //    var mapurl;
            var query = UrlData.findOne({ 'shorturl': req.params.url },
                function(err, doc) {
                    if (err) {
                        res.send(err)
                    }
                    console.log(req.params);
                    console.log(doc);
                    console.log(doc.longurl);
                    var mapurl = doc.longurl;
                    console.log("Reditecing to " + mapurl);
                    res.redirect(mapurl);
                });

        },
    },
}