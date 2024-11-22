const express = require('express')
const router = express.Router()


router.post('/user', (req, res) => {
    res.status(200).json({
        status: 'success',
        route: 'register',
        data: req.body
    });
})

router.get('/user/:id', (req, res) => {
    res.send(`user with id ${req.params.id}`)
})

module.exports = router;