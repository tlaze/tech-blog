const sequelize = require('../config/connection');

const usersData = require('./usersData');
const postsData = require('./postsData');

const seedDatabase = async () => {
	await sequelize.sync({ force: true });
	
	await usersData();
	await postsData();
	process.exit(0);
};

seedDatabase();

