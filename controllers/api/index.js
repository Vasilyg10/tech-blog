const router = require('express').Router();
const postRoutes = require('./post-routes');
const userRoutes = require('./user-routes');
const commentRoutes = require('./user-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;