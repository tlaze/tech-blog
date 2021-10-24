const sequelize = require('../config/connection');
const seedExample = require('./exampleData');

const putInData = async () => {
	await sequelize.sync({ force: true });
	await seedExample();
	process.exit(0);
};

putInData();