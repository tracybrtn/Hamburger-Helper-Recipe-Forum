const path = require("path");
const router = require("express").Router();
const { Category, User, Recipe, Diet } = require('../models');

// Connect with login page
router.get('/login', (req, res) => {
  //If user is already logged in, redirect to userpage
  if (req.session.loggedIn) {
    res.redirect('/userlist');
    return;
  }

  res.render("login");
});

// Connect with sign up page
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/userlist');
    return;
  }
  res.render("signup");
});

//Connect to dashboard
router.get("/dashboard", (req, res) => {
  const post = dbPostData.get({ plain: true });

  res.render("dashboard", {
    post,
    loggedIn: req.session.loggedIn
  })


});

//Connect to add recipes
router.get("/addrecipe", (req, res) => {
  res.render("addrecipe", {
    loggedIn: req.session.loggedIn
  })
});

//Connect to user List
router.get("/userlist", (req, res) => {
  res.render("userlist");
});

//display recipes
router.get("/display", (req, res) => {
  res.render("display");
});

//Connect to add recipe
router.get("/addrecipe", (req, res) => {
  res.render("addrecipe");
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
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = dbPostData.get({ plain: true });

      res.render('single-post', {
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
  res.render('dashboard');
});


//Export router function
module.exports = router;
