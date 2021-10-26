const Posts = require('./Posts');
const Users = require('./Users');

Users.hasMany(Posts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Posts.belongsTo(Users, {
    foreignKey: 'user_id',
    onDelete:"CASADE"
});

module.exports = { Posts, Users};