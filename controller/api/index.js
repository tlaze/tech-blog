const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
// const postsRoutes = require('./postsRoutes')

router.use('/users', usersRoutes);
// router.use('/posts', postsRoutes);

module.exports = router;