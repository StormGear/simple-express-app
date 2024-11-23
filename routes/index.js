const express = require('express');
const router = express.Router();

// POST, GET, PUT, DELETE

router.get('/', (req, res, next) => {
    res.send('Hello from Routes directory');
  });
  
router.get('/test', (req, res, next) => {
      res.render('home', { name: 'Papa Kofi', age: 21,  cache: true, filename: 'home' });
    });
  
router.get('/json', (req, res, next) => {
      const data = {
          message: 'Hello World!'
      };
      res.status(200).json(data);
})

// POST Request
router.post('/post', (req, res) => {
  
    res.status(200).json({
      status: 'success',
      data: req.body
  });
});

router.get('/user/:id', (req, res) => {
    res.send(`user ${req.params.id}`)
  })
  
// router.get('/:profile/:user', (req, res) => {
//     res.json(req.params)
//     })

router.get('/query', (req, res) => {

    const data = {
        name: req.query.name,
        age: req.query.age
    }

    // res.json({
    //     name,
    //     age
    // });

    res.render('profile', data);

})

router.get('/form', (req, res) => { 
    res.render('form');
})

router.get('/params/:name/:age', (req, res) => {

    const data = {
        name: req.params.name,
        age: req.params.age
    }

    // res.json({
    //     name,
    //     age
    // });

    res.render('profile', data);

})

router.get('/try', (req, res, next) => {
    res.json({
      message: 'Hello World!'
    })
  });
  




module.exports = router;