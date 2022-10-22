const path = require('path');
const router = require('express').Router();

//TO-DO: Connect server with HTML
    //Connect Index
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
    //Connect to recipes
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html')); //recipes.html?
});
    //redirect undefined to Index
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//Export router function
module.exports = router;