const router = require('express').Router();
const sequelize = require('../config/connection');
const { Posts, Users } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async(req,res) => {
   try{
       const postData = await Posts.findAll({
           where: {
               user_id: req.session.user_id
           },
           attributes: [
               'id',
               'title',
               'description',
               'date_created'
           ],
           include: [{
               model: Users,
               attributes: ['username'],
           }
       ]
    });
    const posts = postData.map(data => data.get({ plain: true }));
    res.render('dashboard', {
        posts,
        loggedIn: true
        });
   }
   catch(err){
       console.error(err);
       res.status(500).json(err);
   }
    
})

module.exports = router;