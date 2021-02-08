const Course = require('../models/Course');

class CourseController {
	// GET /news
	index(req, res) {
		Course.find({}, function (err, courses) {
			if (!err) {
				res.json(courses);
			}
			res.status(400).json({
				error: err,
			});
		});
		res.render('course');
	}

	// GET /news/:slug
	show(req, res) {
		res.send('News Detail');
	}
}

module.exports = new CourseController();
