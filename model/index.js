var debug = require('debug')('app:model-index');
var mongo = require('mongoose');

const connectionString = process.env.MONGO_CONN_STRING;

(async () => {
	try {
		await mongo.connect(connectionString, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});
	} catch (err) {
		debug(`Connection error: ${err}`);
	}
})();

require('./models/user')(mongo);
require('./models/item')(mongo);

module.exports = model => mongo.model(model);
