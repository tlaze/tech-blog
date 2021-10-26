const router = require('express').Router();
const { Posts, Users } = require('../models');
const withAuth = require('../utils/auth');

// Displays dashboard after being logged in
router.get('/', withAuth, async (req, res) => {
    try{
      // Find the logged in user based on the session ID
      const postsData = await Posts.findAll(
        {
          where: {
            user_id: req.session.user_id,
          },
          attributes: [
            'id',
            'title',
            'description',
            'date_created'
          ],
          include:{
            model: Users,
            attributes: ['username']
            }
        });
        console.log(postData);
        const dashPosts = postsData.map(post => post.get({ plain: true }));

        res.render('dashboard', { dashPosts, loggedIn: true });
    }
    catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;