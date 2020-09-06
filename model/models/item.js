var debug = require('debug')('app:model-item');
var mongo = require('mongoose');

module.exports = db => {
	var schema = mongo.Schema({
		name: { type: String, required: true },
		price: { type: Number, required: true }
	});
	db.model('Item', schema, 'item');
	debug('Item model created');
}
