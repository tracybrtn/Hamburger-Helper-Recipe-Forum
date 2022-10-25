const router = require('express').Router();
const { Diet } = require('../../models');

//get all diets
router.get("/", (req, res) => {
  Diet.findAll()
    .then((dbDietData) => res.json(dbDietData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//gets a specific diet by its id
router.get("/:id", (req, res) => {
  Diet.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dbDietData) => {
      if (!dbDietData) {
        res.status(404).json({ message: "No diet found with this id" });
        return;
      }
      res.json(dbDietData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Creates a new Diet
router.post("/", (req, res) => {
  //expects {Diet: gluten-free}
  Diet.create({
    limit: req.body.limit,
  })
    .then((dbDietData) => res.json(dbDietData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Updates a Diet
router.put("/:id", (req, res) => {
  //expects {Diet: lunch}
  // pass in req.body instead to only update what's passed through
  Diet.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbDietData) => {
      if (!dbDietData) {
        res.status(404).json({ message: "No Diet found with this id" });
        return;
      }
      res.json(dbDietData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete Diet from database
router.delete("/:id", (req, res) => {
  Diet.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbDietData) => {
      if (!dbDietData) {
        res.status(404).json({ message: "No Diet found with this id" });
        return;
      }
      res.json(dbDietData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;