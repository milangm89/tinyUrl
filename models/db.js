var mongoose = require('mongoose');
var config = require('../config/config.js').get(process.env.NODE_ENV);

// var autoIncrement = require('mongoose-auto-increment'); 
mongoose.Promise = Promise;
mongoose.connect(config.database);
// autoIncrement.initialize(mongoose.connect);

var Schema = mongoose.Schema;
mongoose.set('debug', true);

var urlSchema = new Schema({
    // _id : {
    // 	type: Number,
    // 	required: true
    // },
    longurl: {
        type: String,
        unique: true,
        required: true
    },
    shorturl: {
        type: String,
        unique: true,
        required: true
    }
}, { collection: 'tinyurl' }, { versionKey: false });

var UrlData = mongoose.model('UrlData', urlSchema)

module.exports = UrlData;