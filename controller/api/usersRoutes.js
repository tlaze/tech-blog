const router = require('express').Router();
const { Users, Posts } = require('../../models');

// Login
router.get('/login', async (req, res) => {
    try {
      const userData = await Users.findAll({
        attributed: {
          exclude: ['password']
        },
      });
      res.json(userData);
    }
    catch(err){
      console.err(err);
      res.status(500).json(err);
    }
});

router.post('/', (req,res) => {
  try{
    const userData = Users.create({
      username: req.body.username,
      password: req.body.password
    });
    requestAnimationFrame.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      res.json(userData);
    });
  }
  catch(err){
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/login', (req,res) => {
  try{
    const userData = Users.findOne({
      where: {
        username: req.body.username
      }
    });
      
    if(!userData){
      res.status(400).json({ message: "Incorrect Username/Password"});
      return;
    };

    const validPassword = userData.checkPassword(req.body.password);

    if(!validPassword){
      res.status(400).json({ message: "Incorrect Username/Password"});
      return;
    };

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      res.json({ user: userData, message: "You are now Logged In!" });
    });
  }
  catch(err){
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;