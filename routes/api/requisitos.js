const express = require('express');
const router = express.Router();

// Requisitos Model 

const Requisitos = require('../../models/Requisitos');

// GET api/Requisitos
// Get all Requisitos

router.get('/', async (req, res) => {
    
    try{
     const requisitos = await Requisitos.find();
     if(!requisitos) throw Error('Não existem requisitos');
     
     res.status(200).json(requisitos);
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });

 // GET api/requisitos/id
// Get an requisito

router.get('/:id', async (req, res) => {
    
    try{
     const requisito = await Requisitos.findById(req.params.id);
     if(!requisito) throw Error('Não existe esse requisito');
     
     res.status(200).json(requisito);
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });
 

// POST api/requisitos
// create an requisito

router.post('/', async (req, res) => {
   const newRequisito = new Requisitos(req.body);

   try{
    const requisito = await newRequisito.save();
    if(!requisito) throw Error('Erro ao salvar o requisito');
    
    res.status(200).json(requisito);

   }catch(err){
    res.status(400).json({ msg:err });
   }

});


// DELETE api/requisitos/:id
// DELETE an requisito

router.delete('/:id', async (req, res) => {
    
    try{
     const requisito = await Requisitos.findByIdAndDelete(req.params.id);
     if(!requisito) throw Error('Não existe esse requisito');
     
     res.status(200).json({ sucess:true });
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });

 // UPDATE api/requisitos/:id
// UPDATE an requisito

router.patch('/:id', async (req, res) => {
    
    try{
     const requisito = await Requisitos.findByIdAndUpdate(req.params.id, req.body);
     if(!requisito) throw Error('Erro a fazer update');
     
     res.status(200).json({ sucess:true });
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });


module.exports = router;
