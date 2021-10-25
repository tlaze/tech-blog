const router = require('express').Router();
const userRoutes = require('./usersRoutes');
const postRoutes = require('./postsRoutes')

router.use('/users', userRoutes);

module.exports = router;