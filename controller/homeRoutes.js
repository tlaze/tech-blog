const router = require('express').Router();
const { Posts, Users} = require('../models');

router.get('/', async (req, res) => {
    try{
        const postsData = await Posts.findAll();

        const serializedData = postsData.map((data) => data.get({ plain: true }));
    
        //renders homepage.handlebars
        res.render('homepage', { 
            serializedData,
            loggedIn: req.session.loggedIn,
         }); 
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
});


router.get('/login', async (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;