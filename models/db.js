var mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment'); 
mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1:27017/tinyurl');
// autoIncrement.initialize(mongoose.connect);

var Schema = mongoose.Schema;
mongoose.set('debug', true);

var urlSchema = new Schema({
	// _id : {
	// 	type: Number,
	// 	required: true
	// },
	longurl : {
		type: String,
		unique: true,
		required: true
	},
	shorturl : {
		type: String,
		unique: true,
		required: true
	}
}, {collection : 'tinyurl'},
{ versionKey: false });

var UrlData = mongoose.model('UrlData', urlSchema)

module.exports = UrlData;
