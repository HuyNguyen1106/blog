const path = require("path");
const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const app = express();

const SortMiddleware = require("./app/middlewares/SortMiddleware");
const db = require("./config/db");

// DB Connect
db.connect();

const route = require("./routes/index");
const Category = require("./app/models/Category");

// override with POST having ?_method=DELETE/PUT
app.use(methodOverride("_method"));

// HTTP log
// app.use(morgan('combined'));
// Static
app.use(express.static(path.join(__dirname, "public")));

app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.json());
app.use(SortMiddleware);

app.engine(
	"hbs",
	handlebars({
		extname: ".hbs",
		helpers: {
			sum: (a, b) => a + b,
			equals: (a, b) => a === b,
			sortable: (field, sort) => {
				const sortType = field === sort.column ? sort.type : "default";

				const icons = {
					default: "fas fa-sort",
					asc: "fas fa-sort-up",
					desc: "fas fa-sort-down",
				};
				const types = {
					default: "desc",
					desc: "asc",
					asc: "desc",
				};

				const icon = icons[sortType];
				const type = types[sortType];

				return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`;
			},
		},
	})
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

const port = 3000;

// Routes
route(app);

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
