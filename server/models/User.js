var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    email : {
	  type: String,
	  required: true,
	  unique: true
	},
	password : {
	  type: String,
	  required: true,
	  unique: true
	}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userSchema);
