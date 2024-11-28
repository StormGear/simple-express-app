const express = require('express');
const app = express();
const path = require('path');
const hoganMiddleware = require('hogan-middleware');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Simple Express Application',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://simple-express-proj-b3a02135f433.herokuapp.com/',
        description: 'Production server',
      }
    ]
  },
  apis: ['./index.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

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

/**
 * @openapi
 * /:
 *   get:
 *     description: This is the base url/route
 *     responses:
 *       200:
 *         description: Returns a welcome page.
 */
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