const express = require('express');
const router = express.Router();

const Note = require('../models/Note');

router.get('/notes/add',(req,res) =>{
    res.render('notes/new-note');
});

router.post('/notes/new-note',async (req,res) =>{
    //console.log(req.body);
    const {title, description}=req.body;
    const errors = [];
    if (!title){
        errors.push({text:'Por favor escribe un titulo.'})
    }
    if (!description){
        errors.push({text:'Por favor escribe una descripción.'})
    }

    if (errors.length > 0){
        res.render('notes/new-note',{
            errors,
            title,
            description
        })
    }else{
        //res.send('ok');
        const newNote = new Note({title,description});
        //console.log(newNote);
        newNote.save();
        res.redirect('/notes');
    }
    
});


router.get('/notes/',(req,res)=>{
    res.send('Se guardo exitosamente.');
})

module.exports = router;