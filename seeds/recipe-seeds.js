const { Recipe } = require('../models');

const recipeData = [
  {
    title: 'Quiche',
    description: "this is a recipe for quiche!",
    ingredients: "eggs, cheese, green pepper, and salt and pepper",
    instructions: "I actually don't know how to make quiche",
    time: "probably like 10 mins or so",
    user_id: 1,
    category_id: 1,
  },
  {
    title: 'Broccoli Cheddar Soup',
    description: "it's literally just cheddar soup with some brocolli in it",
    ingredients: "BROCOLLI AND CHEDDAR",
    instructions: "open the can and add it to the pot, heat for like 3 mins",
    time: "like 3 mins",
    user_id: 3,
    category_id: 2,
  },
  
];

const seedRecipe = () => Recipe.bulkCreate(recipeData);

module.exports = seedRecipe;