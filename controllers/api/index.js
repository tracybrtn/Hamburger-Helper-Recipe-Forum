const router = require('express').Router();

const categoryRoutes = require('./category-routes')
const dietRoutes = require('./diet-routes');
const recipeRoutes = require('./recipe-routes');
const recipeDietRoutes = require('./recipeDiet-routes');
const userRoutes = require('./user-routes');

router.use('/category', categoryRoutes);
router.use('/diet', dietRoutes);
router.use('/recipe', recipeRoutes);
router.use('/recipeDiet', recipeDietRoutes);
router.use('/user', userRoutes);

module.exports = router;