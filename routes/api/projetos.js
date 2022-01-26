const express = require('express');
const router = express.Router();

// projetos Model 

const Projetos = require('../../models/Projetos');

// GET api/projetos
// Get all projetos

router.get('/', async (req, res) => {
    
    try{
     const projetos = await Projetos.find();
     if(!projetos) throw Error('Não existem projetos');
     
     res.status(200).json(projetos);
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });

 // GET api/projetos/id
// Get an projeto

router.get('/:id', async (req, res) => {
    
    try{
     const projeto = await Projetos.findById(req.params.id);
     if(!projeto) throw Error('Não existe esse projeto');
     
     res.status(200).json(projeto);
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });
 

// POST api/projetos
// create an projeto

router.post('/', async (req, res) => {
   const newProjeto = new Projetos(req.body);

   try{
    const projeto = await newProjeto.save();
    if(!projeto) throw Error('Erro ao salvar o projeto');
    
    res.status(200).json(projeto);

   }catch(err){
    res.status(400).json({ msg:err });
   }

});


// DELETE api/projetos/:id
// DELETE an projeto

router.delete('/:id', async (req, res) => {
    
    try{
     const projeto = await Projetos.findByIdAndDelete(req.params.id);
     if(!projeto) throw Error('Não existe esse projeto');
     
     res.status(200).json({ sucess:true });
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });

 // UPDATE api/projetos/:id
// UPDATE an projeto

router.patch('/:id', async (req, res) => {
    
    try{
     const projeto = await Projetos.findByIdAndUpdate(req.params.id, req.body);
     if(!projeto) throw Error('Erro a fazer update');
     
     res.status(200).json({ sucess:true });
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });


module.exports = router;
