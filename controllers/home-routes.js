const router = require("express").Router();
const sequelize = require("../config/connection");
const { User } = require("../models");

<<<<<<< HEAD:controllers/home-routes.js
//TO-DO: Connect server with handlebars
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
=======
router.get("/", (req, res) => {
  User.findAll({
    attributes: ["id", "post_text", "title", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      // pass a single post object into the homepage template
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("homepage", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
>>>>>>> e425f7e628d5c900af205c4d60f4d1eb74a09869:controllers/html-routes.js
});

// GET single post by id
router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "post_text", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        include: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render("single-post", { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
