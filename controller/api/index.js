const router = require('express').Router();
const loginRoute = require('./login');

router.use('/login', loginRoute);

module.exports = router;