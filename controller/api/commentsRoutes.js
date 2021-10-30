const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// Creates a new comment
router.post('/:id', withAuth, async (req,res) => {

    try{
        const comment = await Comments.create({
            description: req.body.description,
            user_id: req.session.user_id,
            post_id: req.body.postId
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