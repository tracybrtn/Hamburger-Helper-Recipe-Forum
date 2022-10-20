const router = require('express').Router();
const { Recipe } = require('../../models');

//Get and post routes
// Get all recipes
router.get('/recipes', (req, res) => {
    const sql = `SELECT 
                AS
                FROM`
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json({
            message: 'success',
            data: rows
          });
    });
});

// Get a single recipe
router.get('/recipe/:id', (req, res) => {
    const sql = `Select `;
    const params = [req.params.id]

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Create a recipe
router.post('/recipe', ({  body  }, res) => {
    //possible input check
    const sql = `INSERT INTO recipes`
    const params = ''

    db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: body,
          changes: result.affectedRows
        });
      });
})

module.exports  = router;