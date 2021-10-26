const router = require('express').Router();
const { Users } = require('../../models');

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

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      
      res.json('You are now Logged In!');
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