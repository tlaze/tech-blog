const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Users extends Model {
    checkPassword(loginPw) {
        console.log(loginPw);
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6],
        },
      },
    },
    {
      hooks: {
        async beforeCreate(newUserData){
          newUserData.password = await bcrypt.hash(newUserData.password,10);
          return newUserData;
      },
    },
    sequelize,
    timeStamps:false,
    freezeTableName: true,
    underscored:true,
    modelName: 'user',
  }
);

module.exports = Users;