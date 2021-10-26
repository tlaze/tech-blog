// const sequelize = require('../config/connection');
// const { Users, Posts } = require('../models');

// const usersData = require('./usersData.json');
// const postsData = require('./postsData.json');

// const seedDatabase = async () => {
// 	await sequelize.sync({ force: true });
	
// 	await Users.bulkCreate(usersData, {
// 		individualHooks: true,
// 		returning: true,
// 	});

// 	await Posts.bulkCreate(postsData);

// 	process.exit(0);
// };

// seedDatabase();

