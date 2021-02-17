const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();

const db = require('./config/db');

// DB Connect
db.connect();

const route = require('./routes/index');
const Category = require('./app/models/Category');

// override with POST having ?_method=DELETE/PUT
app.use(methodOverride('_method'))

// HTTP log
// app.use(morgan('combined'));
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
		helpers: {
			sum: (a, b) => a + b,
			equals: (a, b) => a === b,
		}
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
