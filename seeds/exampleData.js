const { Example } = require('../models');

const exampleData = [
	{
		name: 'Example Name',
		description: "Description",  
	},
	{
		name: 'Example Name2',
		description: "Description2",
	},
	{
		name: 'Example Name3',
		description: "Description3",
	},
];

const seedExample = () => Example.bulkCreate(exampleData);

module.exports = seedExample;
