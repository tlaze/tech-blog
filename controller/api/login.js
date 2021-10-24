const router = require('express').Router();
const { Posts } = require('../../models/index');

router.post('/login', async (req, res) => {
    try{
        const dbExampleData = await Posts.findAll();

        const serializedData = dbExampleData.map((data) => data.get({ plain: true }));
        console.log('data',serializedData);
        
        //renders all.handlebars
        res.render('all', { serializedData }); 
    }
    catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;