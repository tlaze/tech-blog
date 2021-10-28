const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/comments/:id', withAuth, async (req,res) => {
    try{
        const comment = await Comments.create({
            description: req.body.description,
            user_id: req.session.user_id
        });
        console.log("Comment Post: ", comment);
        res.json(comment);
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
});



module.exports = router;