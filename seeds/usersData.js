const { Users } = require('../models');

const usersData = [
	{
		username: "tom",
		password: "password"
	},
	{
		username: "bob",
		password: "secret"
	}
];

const seedUsers = () => Users.bulkCreate(usersData);

module.exports = seedUsers