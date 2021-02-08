const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();

const db = require('./config/db');

// DB Connect
db.connect();

const route = require('./routes/index');

// HTTP log
app.use(morgan('combined'));
// Static
app.use(express.static(path.join(__dirname, 'public')));

app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.json());

app.engine(
	'hbs',
	handlebars({
		extname: '.hbs',
	})
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

const port = 3000;

// Routes
route(app);

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});