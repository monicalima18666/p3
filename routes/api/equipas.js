const express = require('express');
const router = express.Router();

// Equipas Model 

const Equipas = require('../../models/Equipas');

// GET api/equipas
// Get all equipas

router.get('/', async (req, res) => {
    
    try{
     const equipas = await Equipas.find();
     if(!equipas) throw Error('Não existem equipas');
     
     res.status(200).json(equipas);
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });

 // GET api/equipas/id
// Get an equipa

router.get('/:id', async (req, res) => {
    
    try{
     const equipas = await Equipas.findById(req.params.id);
     if(!equipas) throw Error('Não existe essa equipa');
     
     res.status(200).json(equipas);
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });
 

// POST api/equipas
// create an equipa

router.post('/', async (req, res) => {
   const newEquipa = new Equipas(req.body);

   try{
    const equipa = await newEquipa.save();
    if(!equipas) throw Error('Erro ao salvar a equipa');
    
    res.status(200).json(equipa);

   }catch(err){
    res.status(400).json({ msg:err });
   }

});


// DELETE api/equipas/:id
// DELETE an equipa

router.delete('/:id', async (req, res) => {
    
    try{
     const equipa = await Equipas.findByIdAndDelete(req.params.id);
     if(!equipa) throw Error('Não existe essa equipa');
     
     res.status(200).json({ sucess:true });
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });

 // UPDATE api/equipas/:id
// UPDATE an equipa

router.patch('/:id', async (req, res) => {
    
    try{
     const equipa = await Equipas.findByIdAndUpdate(req.params.id, req.body);
     if(!equipa) throw Error('Erro a fazer update');
     
     res.status(200).json({ sucess:true });
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });


module.exports = router;
