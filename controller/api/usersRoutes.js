const router = require('express').Router();
const { Users } = require('../../models');


// router.post('/', async (req,res) => {
//   try{
//     const userData = await Users.create(req.params.username);

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.loggedIn = true;

//       res.status(200).json(userData);
//     });
//     console.log(userData);
//   }
//   catch(err){
//     console.error(err);
//     res.status(400).json(err);
//   }
// });


router.post('/login', async (req, res) => {
  try{
    const userData = await Users.findOne({ where: { username: req.body } });
      
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