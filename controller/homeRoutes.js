const router = require('express').Router();
const { Users, Posts, Comments } = require('../models');
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
  
      console.log("Homepage Posts", homePosts);
      //renders homepage.handlebars
      res.render('homepage', { homePosts ,loggedIn: req.session.loggedIn }); 
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
});

// If user is logged in, directs to the homepage, else goes to log in screen
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
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

// Renders the dashboard page and displays all of the user's posts
router.get('/dashboard', withAuth, async (req, res) => {
  try{
    const postsData = await Posts.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Users
        }
      ]
    })
    const dashPosts = postsData.map(post => post.get({ plain: true }));

    console.log("All Posts on Dashboard: ", dashPosts, Users);
    res.render("dashboard", { dashPosts, username: dashPosts.user, loggedIn: req.session.loggedIn });
  }
  catch(err) {
    console.error(err);
    res.status(500).json(err);
    res.redirect('login');
  }
});


// Routes to new post page after clicking button
router.get('/dashboard/new', withAuth,async (req, res) => {
  if(req.session.loggedIn){
    res.render('createPost');
  }
  else{
    res.redirect('/');
    return
  }
});

// Renders the data from a single post. Link attached to postDetails handle bar to send the id through the route
router.get('/dashboard/:id', withAuth, async (req, res) => {
  try {
    const selectedPost = await Posts.findByPk(req.params.id, {
      include: [
         Users,

        {
          model: Comments,
          include: [Users],
        },
      ],
    });

    if (selectedPost) {
      const post = selectedPost.get({ plain: true });
      
      console.log("Selected Post: ", post);

      res.render('selectedPost', { post, loggedIn: true });
    }
    else {
      res.status(404).end();
    }
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

// Renders the comments page for the post selected on the home page
router.get('/comments/:id', async (req, res) => {
  try{
    const selectedComment = await Posts.findByPk(req.params.id, {
      include: [ Users,
        {
          model: Comments,
          include: Users,
        },
      ],
    });

    if(selectedComment){
      const newComment = selectedComment.get({ plain: true });

      console.log("SelectedPost to view Comments: ", newComment);

      res.render('comments', { newComment, loggedIn:req.session.loggedIn });
    } 
    else {
      res.status(404).end();
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
});


// Routes to homepage on any other parameter
router.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = router;