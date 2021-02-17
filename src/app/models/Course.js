const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const { Schema } = mongoose;

const Course = new Schema({
	name: { type: String, minLength: 3, maxLength: 255 },
	description: { type: String, minLength: 3, maxLength: 600 },
	videoId: { type: String, maxLength: 255 },
	level: { type: String, maxLength: 255 },
	image: { type: String, minLength: 3, maxLength: 255 },
	slug: { type: String, slug: 'name', unique: true },
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
}, {
	timestamps: true,
});

mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all'
})

module.exports = mongoose.model('Course', Course);
