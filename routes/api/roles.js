const express = require('express');
const router = express.Router();

// Roles Model 

const Roles = require('../../models/Roles');

const Users = require('../../models/Users');

const Equipas = require('../../models/Equipas');

const Projetos = require('../../models/Projetos');

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

router.get('/procurarId/:id', async (req, res) => {
 
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



 // query para devolver apenas elementos da equipa quando se cria um projeto 
 // ou seja selecionamos no drop down o id da equipa e para selecionar o gestor só pode aparecer os gestores da equipa selecionada 

 router.post('/buscarGestoresPorEquipa', async (req, res) => {
    console.log(req.body);
    
    try{
    const roles = await Roles.find({idEquipa: req.body.equipa});
    console.log(roles);
    let membros = [];

    for(const role of roles){
       console.log(role);
       let membro = await Users.findOne({_id: role.idUtilizador});
       if(membro.tipo === 'gestor'){
          membros.push(membro);
       }  
    }
    if(!membros) throw Error('Não existem membros');
    
    res.status(200).json(membros);

   }catch(err){
    res.status(400).json({ msg:err });
   } 

});



// project details  selecionar no drop down a equipa  e aparecer todos os membros dela 

router.get('/buscarMembrosEquipa', async (req, res) => {
    
   try{
    const roles = await Roles.find({idEquipa: req.body.equipa});

    let membros = []

    for(const role of roles){
       let membro = await Users.findOne({_id: role.idUtilizador});
       membros.push(membro);
       
    }
    if(!membros) throw Error('Não existem membros');
    
    res.status(200).json(membros);

   }catch(err){
    res.status(400).json({ msg:err });
   }

});


// query para devolver os projetos que o user faz parte 
// ou seja vai aos roles pesquisa pelo id do user vê a equipa a que pertence e vai à equipa buscar o array dos projetos 

//ID no body
router.get('/buscarProjetosUser', async (req, res) => {
    
   try{
    const roles = await Roles.find({idUtilizador: req.body.utilizador});

    let projetos = []
    
    for(const role of roles){
       let equipa = await Equipas.findOne({_id: role.idEquipa});

       for (const projeto of equipa.projetos){
          let proj = await Projetos.findOne({_id:projeto});
          projetos.push(proj);

       }
       
    }
    if(!projetos) throw Error('Não existem projetos');
    
    res.status(200).json(projetos.filter(function (e) {return e != null;}));

   }catch(err){
    res.status(400).json({ msg:err });
   }

});

//ID no endpoint
router.get('/buscarProjetosUser/:id', async (req, res) => {
    
   try{
    const roles = await Roles.find({idUtilizador: req.params.id});

    let projetos = []
    
    for(const role of roles){
       let equipa = await Equipas.findOne({_id: role.idEquipa});

       for (const projeto of equipa.projetos){
          let proj = await Projetos.findOne({_id:projeto});
          projetos.push(proj);

       }
       
    }
    if(!projetos) throw Error('Não existem projetos');
    
    res.status(200).json(projetos.filter(function (e) {return e != null;}));

   }catch(err){
    res.status(400).json({ msg:err });
   }

});


// atraves do id do projeto procura pela a equipa associada ao projeto e depois de encontrar a equipa , 
//vai a tabela roles e procura pelo o id da equipa e devolve todos os utilizadores que estão nessa equipa. 

//ID no body
router.get('/buscarMembrosEquipaporProjeto', async (req, res) => {
    
   try{
    const equipa = await Equipas.findOne({projetos: req.body.projeto});
    const roles = await Roles.find({idEquipa: equipa._id.toString()});

    let membros = []

    for(const role of roles){
       let membro = await Users.findOne({_id: role.idUtilizador});
       membros.push(membro);
       
    }
    if(!membros) throw Error('Não existem membros');
    
    res.status(200).json(membros);

   }catch(err){
    res.status(400).json({ msg:err });
   }

});

//ID no endpoint
router.get('/buscarMembrosEquipaporProjeto/:id', async (req, res) => {
    
   try{
    const equipa = await Equipas.findOne({projetos: req.params.id});
    const roles = await Roles.find({idEquipa: equipa._id.toString()});

    let membros = []

    for(const role of roles){
       let membro = await Users.findOne({_id: role.idUtilizador});
       membros.push(membro);
       
    }
    if(!membros) throw Error('Não existem membros');
    
    res.status(200).json(membros);

   }catch(err){
    res.status(400).json({ msg:err });
   }

});



module.exports = router;
