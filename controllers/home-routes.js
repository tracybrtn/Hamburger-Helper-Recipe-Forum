const path = require("path");
const router = require("express").Router();
const sequelize = require('../config/connection');
const { Category, User, Recipe, Diet } = require('../models');

// Connect with sign up page
router.get("/signup", (req, res) => {
  //If user is already logged in, redirect to userlist
  if (req.session.loggedIn) {
    res.redirect('/userlist');
    return;
  }
  res.render("signup");
});

// Connect with login page
router.get('/login', (req, res) => {
  //If user is already logged in, redirect to userlist
  if (req.session.loggedIn) {
    res.redirect('/userlist');
    return;
  }
  res.render("login");
});

//Connect to user List
router.get('/userlist', (req, res) => {
  Recipe.findAll({
    where: { 
      user_id: req.session.user_id 
    },
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  }).then((dbRecipeData) => {
    const recipes = dbRecipeData.map((recipe) => recipe.get({ plain: true }));
    const user = req.session.username
    console.log(recipes);
    res.render('userlist', {
      user,
      recipes,
      loggedIn: req.session.loggedIn,
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//Connect to dashboard
router.get("/dashboard", (req, res) => {

  res.render("dashboard", {
    loggedIn: req.session.loggedIn
  })


});

//Connect to add recipes
router.get("/addrecipe", (req, res) => {
  Category.findAll()
  Diet.findAll()
  .then((dbRecipeData) => {
    const categories = dbRecipeData.map((category) => category.get({ plain: true}))
    const diets = dbRecipeData.map((diet) => diet.get({ plain: true}))  
    res.render("addrecipe",  {
      categories, 
      diets,
      loggedIn: req.session.loggedIn
    })
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});



//display recipes
router.get("/display", (req, res) => {
  res.render("display");
});


//Connect to dashboard
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});


//get a single post
// get single post
router.get('/recipes/:id', (req, res) => {
  Recipe.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'description',
      'ingredients',
      'instructions',
      'time'
    ],
    include: [
      {
        model: Category,
        attributes: ['category_name'],
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbRecipeData => {
      if (!dbRecipeData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = dbRecipeData.get({ plain: true });

      res.render('/dashboard', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//redirect undefined to Dashboard
router.get("*", (req, res) => {
  res.render('login');
});


//Export router function
module.exports = router;
