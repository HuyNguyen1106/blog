const Category = require('../models/Category');
const Course = require('../models/Course');
const { mapObject, mapArray } = require('../../util/mongoose');

class CourseController {
	// GET /courses
	index(req, res, next) {
		Course.find({})
			.then((courses) => {
				res.render('course', { courses: mapArray(courses) });
			})
			.catch(next);
	}

	// GET /courses/:slug
	show(req, res, next) {
		Course.findOne({ slug: req.params.slug })
			.populate('category')
			.then((course) => {
				!!course &&
					res.render('courses/detail', { course: mapObject(course) });
				res.render('notfound');
			})
			.catch(next);
	}

	// GET /courses/create
	create(req, res, next) {
		Category.find().then((categories) => {
			res.render('courses/create', {
				categories: categories.map((c) => ({
					_id: c._id,
					name: c.name
				}))
			})
		})
		
	}

	// POST /courses/store
	store(req, res, next) {
		const data = req.body;
		data.image = `https://img.youtube.com/vi/${data.videoId}/sddefault.jpg`
		
		const course = new Course(data);
		course.save()
			.then(() => {
				res.redirect('/courses')
			})
			.catch(next);
	}

	// GET /courses/:id/edit
	edit(req, res, next) {
		Course.findById(req.params.id).populate('category').then(course => {
			Category.find().then((categories) => {
				res.render('courses/edit', {
					course: mapObject(course),
					categories: categories.map((c) => ({
						_id: c._id,
						name: c.name
					}))
				})
			})
		})
		
	}

	// PUT /courses/:id
	update(req, res, next) {
		Course.findByIdAndUpdate(req.params.id, req.body)
			.then(() => {
				res.redirect('/me/stored/courses')
			})
			.catch(next)
	}

	// PATCH /courses/:id
	restore(req, res, next) {
		Course.restore({ _id: req.params.id })
			.then(() => {
				res.redirect('back')
			})
			.catch(next)
	}

	// DELETE /courses/:id
	destroy(req, res, next) {
		Course.delete({ _id: req.params.id })
			.then(() => {
				res.redirect('back')
			})
			.catch(next)
	}

	// DELETE /courses/:id
	forceDestroy(req, res, next) {
		Course.deleteOne({ _id: req.params.id })
			.then(() => {
				res.redirect('back')
			})
			.catch(next)
	}

	// POST /courses/multiple-actions
	multipleActions(req, res, next) {
		switch (req.body.action) {
			case 'delete':
				Course.delete({ _id: { $in: req.body.courseIds } })
					.then(() => {
						res.redirect('back')
					})
					.catch(next)
				break;
			
			case 'restore':
				Course.restore({ _id: { $in: req.body.courseIds } })
					.then(() => {
						res.redirect('back')
					})
					.catch(next)
				break;
			
			case 'force-delete':
				Course.deleteOne({ _id: { $in: req.body.courseIds } })
					.then(() => {
						res.redirect('back')
					})
					.catch(next)
				break;
			default:
				res.redirect('back')
				break;
		}
	}
}

module.exports = new CourseController();
