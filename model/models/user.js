var debug = require('debug')('app:model-user');
var mongo = require('mongoose');

module.exports = db => {
	var schema = mongo.Schema({
		firstName:	{type: String, required: true, unique: false},
		lastName:	{type: String, required: true, unique: false},
		username:	{type: String, required: true, unique: true},
		email:		{type: String, required: true, unique: true},
		password:	{type: String, required: true, unique: false}
	});
	db.model('User', schema, 'users');
	debug('User model created');
}
