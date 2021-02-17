const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const { Schema } = mongoose;

const Category = new Schema({
	name: { type: String, minLength: 3, maxLength: 255 },
	description: { type: String, minLength: 3, maxLength: 600 },
	slug: { type: String, slug: 'name' },
	courses: [{ type: Schema.Types.ObjectId, ref: 'Courses' }],
}, {
	timestamps: true
});

module.exports = mongoose.model('Category', Category);
