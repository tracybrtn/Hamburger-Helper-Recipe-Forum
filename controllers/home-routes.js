const path = require("path");
const router = require("express").Router();
const { Category, User, Recipe, Diet } = require('../models');

//TO-DO: Connect server with HTML
//Connect Index
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get("/signup", (req, res) => {
  if (req.session.signedUp) {
    res.redirect('/');
    return;
  }
  res.render("signup");
});

//Connect to homepage
router.get("/", (req, res) => {
  res.render("homepage");
});

//get a single post
// get single post
router.get('/post/:id', (req, res) => {
  Post.findOne({
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

//redirect undefined to Index
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public"));
});


//Export router function
module.exports = router;
