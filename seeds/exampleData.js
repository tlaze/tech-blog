const { Example } = require('../models');

const exampleData = [
	{
		name: 'Example Name'
	},
	{
		name: 'Example Name2'
	},
];

const seedExample = () => Example.bulkCreate(exampleData);

module.exports = seedExample;
