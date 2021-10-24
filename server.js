const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const routes = require('./controller');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')))

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => {
		console.log(`App listening on port ${PORT}`);
	});
});	