const express = require('express');

const server = express();

const projetos = [];
 
let requisicoes = 0;

server.listen(3000);

server.use(express.json());
server.use((req,res,next) => {
  requisicoes++;
  console.log(requisicoes);
  next();
});

server.post('/projects', existeIdBody, addProjeto);
server.get('/projects', listaTodosProjetos);
server.put('/projects/:id', existeIdParams, alteraTitulo);
server.delete('/projects/:id', existeIdParams, deletaProjeto);
server.post('/projects/:id/tasks', addTarefa);


function addProjeto(req,res){
  const { id, title, tasks } = req.body;
   projetos.push({id, title, tasks});

   return res.json(projetos);
}

function listaTodosProjetos(req,res){
  return res.json(projetos);
}

function alteraTitulo(req, res){
  const { id } = req.params;

  const index = projetos.findIndex((e) => e.id === id);
  if(index === -1){
    return res.status(400).json("Projeto não encontrado");
  }
  projetos[index].title = id;

  return res.json(projetos);
}

function deletaProjeto(req,res){
  const { id } = req.params;

  const index = projetos.findIndex((e) => e.id === id);

  if(index === -1){
    return res.status(400).json("Projeto não encontrado");
  }

  projetos.splice(index,1);
  return res.json(projetos);
}

function existeIdParams(req,res,next){
  if(!req.params.id){
    return res.status(400).json("Id is required!");
  }
  return next();
}

function existeIdBody(req,res,next){
  if(!req.body.id){
    return res.status(400).json("Id is required!");
  }
  return next();
}

function addTarefa(req,res){
  const { id } = req.params;
  const { title } = req.body; 

  const index = projetos.findIndex((e) => e.id === id);
  if(index === -1){
    return res.status(400).json("Projeto não encontrado");
  }

  projetos[index].tasks.push(title);
  return res.json(projetos[index]);

 }
