const express = require('express');
const router = express.Router();

// users Model 

const Users = require('../../models/Users');

// GET api/users
// Get all users

router.get('/', async (req, res) => {
    
    try{
     const users = await Users.find();
     if(!users) throw Error('Não existem users');
     
     res.status(200).json(users);
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });

 

// POST api/users
// create an user

router.post('/', async (req, res) => {
   const newUser = new Users(req.body);

   try{
    const user = await newUser.save();
    if(!user) throw Error('Erro ao salvar o User');
    
    res.status(200).json(user);

   }catch(err){
    res.status(400).json({ msg:err });
   }

});


// DELETE api/users/:id
// DELETE an user

router.delete('/:id', async (req, res) => {
    
    try{
     const user = await Users.findByIdAndDelete(req.params.id);
     if(!user) throw Error('Não existe esse user');
     
     res.status(200).json({ sucess:true });
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });

module.exports = router;
