const path = require("path");
const router = require("express").Router();

//TO-DO: Connect server with HTML
//Connect Index
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

//Connect to recipes
router.get("/", (req, res) => {
  res.render("homepage");
});

//redirect undefined to Index
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public"));
});

//Export router function
module.exports = router;
