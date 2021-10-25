const router = require('express').Router();
const { Posts, Users } = require('../models');
const sequelize = require('../config/connection');

// Displays all posts on homepage
router.get('/', async (req, res) => {
    try{
        const postsData = await Posts.findAll({
            attributes: [
                'id',
                'title',
                'description',
                'date_created'
            ],
            include: [
                {
                    model: Users,
                    attributes: ['username'],
                },
            ]
        });

        // Serialized post data so it can be read by the handlebars template
        const posts = postsData.map((post) => post.get({ plain: true }));
    
        //renders homepage.handlebars
        res.render('homepage', { 
            posts,
            loggedIn: req.session.loggedIn
         }); 
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }
    res.render('login');
}); 


router.get('/signup', async (req,res) => {
    res.render('signup');
});

module.exports = router;