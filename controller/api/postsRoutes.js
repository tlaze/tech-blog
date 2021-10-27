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
        const [updatePost] = await Posts.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if(updatePost > 0){
            res.status(200).end();
        }
        else{
            res.status(404).end();
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;