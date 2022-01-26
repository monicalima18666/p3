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

 // GET api/users/id
// Get an users

router.get('/:id', async (req, res) => {
    
    try{
     const user = await Users.findById(req.params.id);
     if(!user) throw Error('Não existem users');
     
     res.status(200).json(user);
 
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

 // UPDATE api/users/:id
// UPDATE an user

router.patch('/:id', async (req, res) => {
    
    try{
     const user = await Users.findByIdAndUpdate(req.params.id, req.body);
     if(!user) throw Error('Erro a fazer update');
     
     res.status(200).json({ sucess:true });
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });



 router.post('/login',async (req,res)=>{
   
    let result = Users.find(Users.username == req.body.username);

       if(result) {

        if(result.password == req.body.password ){

            res.status(200).send ( {
                message: "Sucessful login!!"
            })
        }else {
            res.status(200).send ( {
                message: " password incorrect"
            })
        } 
    }
        else {
            res.status(200).send ( {
                message: " user not found!!"
            })
        }   
    }); 


module.exports = router;
