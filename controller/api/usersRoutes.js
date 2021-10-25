const router = require('express').Router();
const { User } = require('../../models');

//Creat new user
router.post('/', async (req,res) => {
    try{
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        //Set up sessions with the logged in variable
        req.session.save(() => {
            req.session.loggedIn = true,
            res.status(200).json(dbUserData);
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
});

// Login
router.post('/login', async (req,res) => {
    try{
        const dbUserData = await User.findOne({
            where: {
                username:req.body.username,
            },
        });
        if(!dbUserData){
            res.status(400).json({ message: 'Incorrect Username or Password. Please Try Again!'});
            return;
        }
        const validPassword = await dbUserData.checkPassword(req.body.password);

        if(!validPassword){
            res.status(400).json({ message: 'Incorrect Username or Password. Please Try Again!'});
            return;
        }
        
        res.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json({ message: 'Hello, ', user: dbUserData, message: '. You Are Now Logged In!'});
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
})


module.exports = router;