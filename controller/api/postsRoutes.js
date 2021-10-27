const router = require('express').Router();
const { Posts } = require('../../models');
const withAuth = require('../../utils/auth');

// Creates new post
router.post('/dashboard/new', withAuth, async (req,res) => {
    try{
        const newPost = await Posts.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.session.user_id
        });

        res.json(newPost);
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
});

router.put('/dashboard/:id', withAuth, async (req,res) => {
    try{
        const updatePost = await Posts.update({
            title: req.body.title,
            description: req.body.description
        },
        {
            where: {
                id: req.params.id
            },
        });

        if(!updatePost){
            res.status(404).json({ message: "No post found with this id" });
            return;
        }
        console.log(updatePost);
        res.json(updatePost);
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;