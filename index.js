const express = require('express');

const server = express();

const projetos = [];

server.listen(3000);

server.use(express.json());

server.post('/projects',addProjeto);
server.get('/projects',listaTodosProjetos);
server.put('/projects/:id',alteraTitulo);
server.delete('/projects/:id',deletaProjeto);


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

  const index = projetos.findIndex((e) => e.id = id);
  projetos[index].title = id;

  return res.json(projetos);
}

function deletaProjeto(req,res){
  const { id } = req.params;

  const index = projetos.findIndex((e) => e.id = id);
  projetos.splice(index,1);

  return res.json(projetos);
}
