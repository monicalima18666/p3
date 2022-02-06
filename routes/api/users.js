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
        try{
    
            const User1 =  await Users.findOne({ username: req.body.username }) ;
            if(User1){
                if(User1.password == req.body.password){
                    // res.json(User1.tipo)
                    res.json({message: 'Success' , user :User1.tipo, id_user: User1._id, name: User1.nome});
                }else{
                    res.json({message: "Password Incorreta!"});
                }
    
            }else{
                res.json({message: "Username não existe!"})
            }

        }catch(err){
            res.json({message:err})
        }
    
    });


module.exports = router;
