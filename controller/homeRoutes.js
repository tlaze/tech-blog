const router = require('express').Router();
const { Example } = require('../models/Example');

router.get('/', async (req,res) => {
    try{
        const dbExampleData = await Example.findAll({
            include: [
                {
                    model: Example
                },
            ],
        });
        console.log("Yes");
        res.status(200).json(dbExampleData);
    }
    catch(err){
        console.log("no");
        res.status(500).json(err);
    }
})

module.exports = router;