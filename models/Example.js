const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Example extends Model {}

Example.init(
	{
		id: {
            type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
		},
        description: {
            type: DataTypes.STRING,
        },
	},
	{
		sequelize,
        timestamps: false,
		freezeTableName: true,
		modelName: 'example',
	}
);

module.exports = Example;