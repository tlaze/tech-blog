const router = require('express').Router();
const { Posts, Users } = require('../models');
const withAuth = require('../utils/auth');

// Displays all posts on homepage
router.get('/', async (req, res) => {
    try{
        const postsData = await Posts.findAll({
            include: [
                {
                    model: Users,
                    attributes: ['username'],
                },
            ]
        });
        // Serialized post data so it can be read by the handlebars template
        const posts = postsData.map((post) => post.get({ plain: true }));
    
        //renders homepage.handlebars
        res.render('homepage', { 
            posts,
            loggedIn: req.session.loggedIn,
        }); 
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
});

// If user is logged in, directs to dashboard, else goes to log in screen
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
}); 

// Routes to signup page
router.get('/signup', async (req,res) => {
  res.render('signup');
});


// Displays dashboard after being logged in
router.get('/dashboard', withAuth, async (req, res) => {
  
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
          'date_created',
          'user_id'
        ],
        include:{
          model: Users,
          }
      });
      if(!postsData){
        res.status(404).json({ message: "No Posts Available" });
        return;
      }
      const dashPosts = postsData.map(post => post.get({ plain: true }));
      dashPosts.user = req.session.username;
      dashPosts.id = req.session.user_id;
      console.log("dashpost", dashPosts);
      res.render('dashboard', {
            dashPosts: dashPosts,
            user: req.session.username,
            id: req.session.user_id,
            loggedIn: req.session.loggedIn
      });
  }
  catch(err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Routes to new post page after clicking button
router.get('/dashboard/new', async (req, res) => {
  res.render('newPost');
});

module.exports = router;