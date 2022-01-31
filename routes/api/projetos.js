const express = require('express');
const router = express.Router();

// projetos Model 

const Projetos = require('../../models/Projetos');

const Equipas = require('../../models/Equipas');

const Users = require('../../models/Users');

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
    
      if(req.body.idequipa){


         const equipa = await Equipas.findOne({_id:req.body.idequipa});

         if(req.body.idGestor){

            const user = await Users.findOne({_id:req.body.idGestor});

          if(user){

            if(user.tipo === 'gestor'){ 

               if(equipa) {
                  let projetos = equipa.projetos;
   
                  projetos.push(newProjeto._id.toString());
                  equipa.projetos = projetos;
                  const e = await equipa.save();
                  const projeto = await newProjeto.save();
   
               }else{
                  res.status(400).json('Equipa não existe');
               }
        
          }else{
            res.status(400).json('User não é gestor');
          }

          } else{
            res.status(400).json('User não existe');
          }

         }else{

            if(equipa) {
               let projetos = equipa.projetos;

               projetos.push(newProjeto._id.toString());
               equipa.projetos = projetos;
               const e = await equipa.save();
               const projeto = await newProjeto.save();

            }else{
               res.status(400).json('Equipa não existe');
            }
     
         }           
            
      }else{
      
         if(req.body.idGestor){

            const user = await Users.findOne({_id:req.body.idGestor});

            if(user){
               if(user.tipo === 'gestor'){

                  const projeto = await newProjeto.save();

               } else{
                res.status(400).json('User não é gestor');
               }

            }else{
            res.status(400).json('User não existe');
          }


         }else{

            const projeto = await newProjeto.save();
         }
 
      }   

    if(!newProjeto) throw Error('Erro ao salvar o projeto');
    
    res.status(200).json(newProjeto);

   } catch(err){
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
       
      if(req.body.idGestor){

         const user = await Users.findOne({_id:req.body.idGestor});

         if(user){
            if(user.tipo === 'gestor'){

               const projeto = await Projetos.findByIdAndUpdate(req.params.id, req.body);

            } else{
             res.status(400).json('User não é gestor');
            }

         }else{
         res.status(400).json('User não existe');
       }

      } else{
         const projeto = await Projetos.findByIdAndUpdate(req.params.id, req.body);
      } 
    
     
     res.status(200).json({ sucess:true });
 
    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });


module.exports = router;
