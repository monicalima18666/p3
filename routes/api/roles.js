const express = require('express');
const router = express.Router();

// Roles Model 

const Roles = require('../../models/Roles');

// GET api/roles
// Get all roles

router.get('/', async (req, res) => {
    
    try{
     const roles = await Roles.find();
     if(!roles) throw Error('Não existem roles');
     
     res.status(200).json(roles);
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });

 // GET api/roles/id
// Get an role

router.get('/:id', async (req, res) => {
    
    try{
     const roles = await Roles.findById(req.params.id);
     if(!roles) throw Error('Não existe esse role');
     
     res.status(200).json(roles);
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });
 

// POST api/roles
// create an role

router.post('/', async (req, res) => {
   const newRole = new Roles(req.body);

   try{
    const role = await newRole.save();
    if(!role) throw Error('Erro ao salvar o role');
    
    res.status(200).json(role);

   }catch(err){
    res.status(400).json({ msg:err });
   }

});


// DELETE api/roles/:id
// DELETE an role

router.delete('/:id', async (req, res) => {
    
    try{
     const role = await Roles.findByIdAndDelete(req.params.id);
     if(!role) throw Error('Não existe esse role');
     
     res.status(200).json({ sucess:true });
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });

 // UPDATE api/roles/:id
// UPDATE an role

router.patch('/:id', async (req, res) => {
    
    try{
     const role = await Roles.findByIdAndUpdate(req.params.id, req.body);
     if(!role) throw Error('Erro a fazer update');
     
     res.status(200).json({ sucess:true });
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });


module.exports = router;
