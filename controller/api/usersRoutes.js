const router = require('express').Router();
const { Users, Posts } = require('../../models');

// Checks to make sure user logging in is in the database
router.post('/login', async (req, res) => {
  try{
    const userData = await Users.findOne(
      { 
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
    console.log(userData);
    req.session.save(() => {
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

// Signs up new user/ Adds new user to database
router.post('/signup', async (req, res) => {
  try{
    const newUser = await Users.create({
          username: req.body.username,
          password: req.body.password
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;
      res.json(newUser);
    });
  }
  catch(err){
    console.error(err);
    res.status(500).json(err);
  }
});




// Logs user out
router.post('/logout', (req, res) => {
  if(req.session.loggedIn){
    // Destroys the current session and logs user out
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else{
    res.status(400).end();
  }
});

module.exports = router;