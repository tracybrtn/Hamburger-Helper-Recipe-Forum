const router = require('express').Router();
const recipeRoutes = require('../apiRoutes/recipeRoutes');

router.use(recipeRoutes);

module.exports = router;