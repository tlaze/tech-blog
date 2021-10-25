const sequelize = require('../config/connection');
const seedPosts = require('./postsData');

const putInData = async () => {
	await sequelize.sync({ force: true });
	await seedPosts();
	
	process.exit(0);
};

putInData();