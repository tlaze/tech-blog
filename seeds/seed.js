const { Posts, Users } = require('../models');
const sequelize = require('../config/connection');

const postsData = require('./postsData');
const usersData = require('./usersData');

const seedDatabase = async () => {
	await sequelize.sync({ force: true });
	
	const user = await Users.bulkCreate(usersData,{
		individualHooks: true,
		returning: true,
	});

	for(const post of postsData){
		await Posts.create({
			...post,
			user_id: user[Math.floor(Math.random() * user.length)].id,
		});
	}
	
	process.exit(0);
};

seedDatabase();

