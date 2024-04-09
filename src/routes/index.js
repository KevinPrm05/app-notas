const express = require('express');
const router = express.Router(); //facilita creacion de rutas

router.get('/',(req,res) =>{
    res.render('index');
})

router.get('/about',(req,res) =>{
    res.render('about');
})

module.exports = router;