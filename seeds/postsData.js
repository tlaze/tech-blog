const { Posts } = require('../models');

const postData = [
	{
		title: 'Example Title 1',
		description: "Description 1",  
	},
	{
		title: 'Example Title 2',
		description: "Description 2",
	},
	{
		title: 'Example Title 3',
		description: "Description 3",
	},
];

const seedPosts = () => Posts.bulkCreate(postData);

module.exports = seedPosts;
