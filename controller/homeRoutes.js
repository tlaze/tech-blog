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
                  attributes: ["username"],
              },
          ]
      });
      // Serialized post data so it can be read by the handlebars template
      const homePosts = postsData.map((post) => post.get({ plain: true }));
  
      // console.log("line20homeRoutes",homePosts);
      //renders homepage.handlebars
      res.render('homepage', { homePosts ,loggedIn: req.session.loggedIn }); 
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
});

// If user is logged in, directs to dashboard, else goes to log in screen
router.get('/login', async (req, res) => {
  if(req.session.loggedIn){
    res.redirect('/');
    return;
  }
  res.render('login');
}); 

// Routes to signup page
router.get('/signup', async (req,res) => {
  if(req.session.loggedIn){
    res.redirect('/');
    return;
  }
  res.render('signup');
});

// Renders the dashboard page and displays all of the user's posts
router.get('/dashboard', withAuth, async (req, res) => {
  try{
    const postsData = await Posts.findAll({
    
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        "id",
        "title",
        "description",
        "date_created"
      ],
      include: [
        {
          model: Users,
          attributes: ["username"]
        }
      ]
    })
    const dashPosts = postsData.map(post => post.get({ plain: true }));

    console.log("posts from homeRoutes/dash", dashPosts);
    res.render("dashboard", { dashPosts, loggedIn: true });
  }
  catch(err) {
    console.error(err);
    res.status(500).json(err);
  }
});


// Routes to new post page after clicking button
router.get('/dashboard/new', async (req, res) => {
  if(req.session.loggedIn){
    res.render('newPost');
  }
  else{
    res.redirect('/');
    return
  }
});

router.get('*', (req, res) => {
  res.redirect('/');
});


module.exports = router;