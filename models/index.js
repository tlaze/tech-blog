const Users = require('./Users');
const Posts = require('./Posts');
const Comments = require('./Comments');

Users.hasMany(Posts, {
    foreignKey: "user_id"
});

Posts.belongsTo(Users, {
    foreignKey: "user_id"
});

Posts.hasMany(Comments,{
    foreignKey: 'post_id'
});

Comments.belongsTo(Users,{
    foreignKey: 'user_id'
});


module.exports = { Posts, Users, Comments};