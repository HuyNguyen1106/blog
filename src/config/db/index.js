const mongoose = require('mongoose');

function connect() {
	try {
		mongoose.connect('mongodb://localhost:27017/edu_dev', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
	} catch (error) {
		console.log(`Connection Error: ${error}`);
	}
}

module.exports = { connect };
