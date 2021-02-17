const newsRouter = require('./news');
const courseRouter = require('./course');
const siteRouter = require('./site');
const meRouter = require('./me');

function route(app) {
	app.use('/news', newsRouter);

	app.use('/courses', courseRouter);

	app.use('/me', meRouter);

	app.use('/', siteRouter);

	app.use('*', (req, res) => res.render('notfound'));
}

module.exports = route;
