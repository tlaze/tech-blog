const Posts = require('./Posts');
const Users = require('./Users');

Users.hasMany(Posts, {});

Posts.belongsTo(Users, {
    foreignKey: 'user_id'
});

module.exports = { Posts, Users};