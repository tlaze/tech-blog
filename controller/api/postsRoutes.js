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
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
});

// router.put('/dashboard/:id', withAuth, async (req,res) => {
//     try{
//         const updatePost = await Posts.create({
//             title: req.body.title,
//             description: req.body.description,
//             user_id:req.session.user_id
//         },
//         {
//             where: { id: req.params.id }
//         });

//         res.json(updatePost);
//     }
//     catch(err){
//         console.error(err);
//         res.status(500).json(err);
//     }
// });

module.exports = router;