const router = require('express').Router();
const { Example } = require('../models/index');

router.get('/', async (req, res) => {
    try{
        const dbExampleData = await Example.findAll();

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