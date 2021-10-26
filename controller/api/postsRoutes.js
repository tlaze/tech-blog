const router = require('express').Router();
const { Users, Posts } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/dashboard', withAuth, async (req,res) => {
    try{
        const newPost = await Posts.create({
            title: req.body.title,
            body: req.body.description,
            user_id: req.session.user_id,
        });
        res.json(newPost);
    }
    catch(err){
        console.error(err);
        rest.status(500).json(err)
    }
})

module.exports = router;