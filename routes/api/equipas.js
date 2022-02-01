const express = require('express');
const router = express.Router();

// Equipas Model 

const Equipas = require('../../models/Equipas');

const Projetos = require('../../models/Projetos');

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
    if(!equipa) throw Error('Erro ao salvar a equipa');
    
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
       if(req.body.projeto){


         const equipa = await Equipas.findOne({_id: req.params.id});  

         if(equipa){
            
            const verficar = await Equipas.findOne({projetos: req.body.projeto});
         
            if(!verficar){

               const projeto = await Projetos.findOne({_id: req.body.projeto});

            if(projeto){
            
               let projetos = equipa.projetos;
               projetos.push(req.body.projeto);
               equipa.projetos = projetos;

               if (req.body.nome) equipa.nome = req.body.nome;
               if (req.body.contacto) equipa.contacto = req.body.contacto;

               const r = await equipa.save();

               const resultado = await Equipas.findOne({_id: req.params.id});
               res.json(resultado); 

            }else{
               res.json('Projeto não existe!');
            }

            }else {
               res.json('Projeto já existe numa equipa');
            }
            
         }else{
            res.json('Equipa não existe!');
         }


       }else{
      
            const equipa = await Equipas.findByIdAndUpdate(req.params.id, req.body);
         
            const resultado = await Equipas.findOne({_id: req.params.id});
            res.json(resultado); 

        
         
       }

    }catch(err){
     res.status(400).json({ msg:err });
    }
 
 });


module.exports = router;
