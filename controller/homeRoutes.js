const router = require('express').Router();
const { Posts } = require('../models/index');

router.get('/', async (req, res) => {
    try{
        const postsData = await Posts.findAll();

        const serializedData = postsData.map((data) => data.get({ plain: true }));
        console.log('data',serializedData);
        
        //renders homepage.handlebars
        res.render('homepage', { serializedData }); 
    }
    catch(err){
        res.status(500).json(err);
    }
});


router.get('/login', async (req, res) => {
    res.render('login');
});

module.exports = router;