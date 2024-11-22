const express = require('express');
const app = express();
const path = require('path');
const hoganMiddleware = require('hogan-middleware');

app.set('views', path.join(__dirname, 'views')); // tell express which directory your views are in
app.set('view engine', 'mustache');     // name your templates
// app.set('view engine', 'ejs');     // name your templates
app.engine('mustache', hoganMiddleware.__express); // register the engine
app.use(express.static(path.join(__dirname, 'public'))); // tell express where to find static files
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(express.json()); // Middleware to parse JSON bodies

const routes = require('./routes/index');
const register = require('./routes/register');
app.use('/', routes);
app.use('/register', register);

app.use((req, res, next) => {
    const timestamp = new Date().toString();
    req.timestamp = timestamp;
    next()
  })

const profiles = {
    papa: {
        name: 'Papa Kofi',
        age: 21,
        company: 'Google',
        languages: ['JavaScript', 'Python', 'Java', 'C#']
    },
    kwame: {
        name: 'Kwame Adu',
        age: 22,
        company: 'Facebook',
        languages: ['JavaScript', 'Python', 'Java']
    },
    kofi: {
        name: 'Kofi Mensah',
        age: 23,
        company: 'Twitter',
        languages: ['JavaScript', 'Python']
    },
    akua: {
        name: 'Akua Serwaa',
        age: 24,
        company: 'Instagram',
        languages: ['JavaScript']
    }
}

app.get('/profile/:user', (req, res) => {
    const user = req.params.user;
    const profile = profiles[user];
    if (profile) {
        profile.timestamp = req.timestamp;
        res.render('profile', profile);
    } else {
        res.send('User not found');
    }
  })

let text = ""
app.post(
    '/addprofile',
    (req, res, next) => {
      fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => {
        text = json
      })

      req.body['languages'] = req.body.languages.split(',')
      profiles[req.body.name] = req.body
      // res.json({
      //   success: true,
      //   payload: req.body,
      //   api_response: text
      // })
      res.redirect(`/profile/${req.body.name}`)
    }
  )

let post;
app.get('/getpost/:id', (req, res) => {
  fetch(`https://jsonplaceholder.typicode.com/todos/${req.params.id}`)
  .then(response => response.json())
  .then(json => {
    post = json
  })
  console.log(post)
  post['image'] = '/images/images.png'
    
  res.render('post', post);
})


app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port 3000');
});