const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model {}

Posts.init(
	{
		id: {
            type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
		},
        description: {
            type: DataTypes.STRING,
        },
	
	},
	{
		sequelize,
        timestamps: true,
		freezeTableName: true,
		modelName: 'post',
	}
);

module.exports = Posts;