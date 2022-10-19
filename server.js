const express = require('express');

// import sequelize connection
const sequelize = require('./config/connection');

//Heroku port || local port
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//include files in public folder
app.use(express.static('public'));

// app.use(routes);

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log("Now Listening"));
});
