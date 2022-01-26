const express = require('express');
const router = express.Router();

// Propostas Model 

const Propostas = require('../../models/Propostas');

// GET api/Propostas
// Get all Propostas

router.get('/', async (req, res) => {
    
    try{
     const propostas = await Propostas.find();
     if(!propostas) throw Error('Não existem propostas');
     
     res.status(200).json(propostas);
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });

 // GET api/Propostas/id
// Get an Proposta

router.get('/:id', async (req, res) => {
    
    try{
     const proposta = await Propostas.findById(req.params.id);
     if(!proposta) throw Error('Não existe esse proposta');
     
     res.status(200).json(proposta);
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });
 

// POST api/Proposta
// create an Proposta

router.post('/', async (req, res) => {
   const newProposta = new Propostas(req.body);

   try{
    const proposta = await newProposta.save();
    if(!proposta) throw Error('Erro ao salvar a proposta');
    
    res.status(200).json(proposta);

   }catch(err){
    res.status(400).json({ msg:err });
   }

});


// DELETE api/Proposta/:id
// DELETE an Proposta

router.delete('/:id', async (req, res) => {
    
    try{
     const proposta = await Propostas.findByIdAndDelete(req.params.id);
     if(!proposta) throw Error('Não existe essa proposta');
     
     res.status(200).json({ sucess:true });
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });

 // UPDATE api/Proposta/:id
// UPDATE an Proposta

router.patch('/:id', async (req, res) => {
    
    try{
     const proposta = await Propostas.findByIdAndUpdate(req.params.id, req.body);
     if(!proposta) throw Error('Erro a fazer update');
     
     res.status(200).json({ sucess:true });
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });


module.exports = router;
