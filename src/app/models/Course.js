const mongoose = require('mongoose');
const { Schema } = mongoose;

const Course = new Schema({
	name: { type: String, minLength: 3, maxLength: 255 },
	description: { type: String, minLength: 3, maxLength: 600 },
	image: { type: String, minLength: 3, maxLength: 255 },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', Course);
