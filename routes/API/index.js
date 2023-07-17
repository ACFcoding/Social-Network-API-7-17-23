const router = require('express').Router();
const thoughRoute = require('./thoughtRoute');
const userRout = require('./userRout');

router.use('/thoughts', thoughRoute);
router.use('/users', userRout);

module.exports = router;
