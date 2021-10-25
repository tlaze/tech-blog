const router = require('express').Router();
const { Posts, Users } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try{
        const postsData = await Posts.findAll({
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

// Uses withAuth middleware to prevent access to routes unless logged in
router.get('/dashboard', async (req,res) => {
    
    const postsData = await Posts.findAll({
        include: [
            {
                model: Users,
                attributes: ['username'],
            },
        ]
    });
    
    // Serialized post data so it can be read by the handlebars template
    const posts = postsData.map((post) => post.get({ plain: true }));
    
    res.render('dashboard', {
        posts,
        loggedIn: req.session.loggedIn
    });


    // try{
    //     const userData = await Users.findByPk(req.session.user_id, {
    //         attributes: { exclude: ['password'] },
    //         include: [{ model: Posts }],
    //     });
        
    //     const user = userData.get({ plain: true });
    //     res.render('dashboard', {
    //         ...user,
    //         loggedIn: true
    //     });
    // }
    // catch(err){
    //     res.status(500).json(err);
    // }
});
            


// Redirects user to login screen if they aren't logged in
router.get('/login', async (req, res) => {
    // if(req.session.loggedIn){
    //     res.redirect('/');
    //     return;
    // }
    res.render('login');
});

router.get('/signup', async (req,res) => {
    res.render('signup');
});

module.exports = router;