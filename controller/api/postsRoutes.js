const router = require('express').Router();
const { Users, Posts } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/dashboard/new', withAuth, async (req,res) => {
    try{
        const newPost = await Posts.create({
            title: req.body.title,
            description: req.body.description,
            user_id:req.session.user_id
        });

        res.json(newPost);

        // req.session.save(() => {
        //     req.session.user_id = newPost.id;
        //     req.session.title = newPost.title;
        //     req.session.description = newPost.description;
        //     req.session.loggedIn = true;
        //     res.json(newPost);
        // });
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;