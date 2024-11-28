const express = require('express');
const app = express();
const path = require('path');
const hoganMiddleware = require('hogan-middleware');


// set up the middleware
app.set('views', path.join(__dirname, 'views')); // tell express which directory your views are in
app.set('view engine', 'mustache');     // name your templates
// app.set('view engine', 'ejs');     // name your templates
app.engine('mustache', hoganMiddleware.__express); // register the engine
app.use(express.static(path.join(__dirname, 'public'))); // tell express where to find static files
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(express.json()); // Middleware to parse JSON bodies

// register the routes in the app
const routes = require('./routes/index');
const register = require('./routes/register');
app.use('/', routes.router);
app.use('/register', register);

// root route
app.get('/', (req, res) => {
  res.send('A simple express CRUD application hosted on Heroku with a PostgreSQL database \n Author: Papa Kofi Boahen');
});

// Get all users
app.get('/users', routes.getAllUsers);

// Get a user by id
app.get('/users/:id', routes.getUserById);

// Create a user
app.post('/users/add-user', routes.createUser);

// Update a user
app.put('/users/update-user/:id', routes.updateUser);

// Delete a user
app.delete('/users/delete-user/:id', routes.deleteUser);




const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}` );
});