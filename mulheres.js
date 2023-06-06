const express = require('express') //iniciando o express
const router = express.Router() //configurando as rotas
const cors = require('cors') //importando o cors
const conectaBancoDeDados = require('./bancoDeDados') //importando o banco de dados
conectaBancoDeDados() //conectando ao banco de dados

const Mulher = require('./mulherModel') //importando o model

const app = express() //iniciando o app
app.use(express.json()) //configurando o express para ler json
app.use(cors()) //configurando o cors

const porta = 3333 //criando a porta

//GET
async function mostraMulheres(request, response){ 
  try{
    const mulheresVindasDoBancoDeDados = await Mulher.find()
    
    response.json(mulheresVindasDoBancoDeDados)
  } catch (erro){
      console.log(erro)
  }
   
  } 
  

  //POST
async function criaMulher(request, response){
  const novaMulher = new Mulher({
    nome: request.body.nome,
    imagem: request.body.imagem, 
    minibio: request.body.minibio,
    citacao: request.body.citacao
  })

  try{
    const mulherCriada = await novaMulher.save()
    response.status(201).json(mulherCriada)
  }catch (erro){
    console.log(erro)
  }
  }


//PATCH
async function corrigeMulher(request, response) {
  try{
    const mulherEncontrada = await Mulher.findById(request.params.id)
   
    if (request.body.nome) {
      mulherEncontrada.nome = request.body.nome
    }
  
    if (request.body.minibio){
      mulherEncontrada.minibio = request.body.minibio
    }
  
    if (request.body.imagem){ 
      mulherEncontrada.imagem = request.body.imagem
    }

    if (request.body.citacao){
      mulherEncontrada = request.body.citacao
    }
    
    const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
    
    response.json(mulherAtualizadaNoBancoDeDados)
  }catch (erro){
    console.log(erro)
  }
}

//DELETE
async function deletaMulher(request, response) {
  try{
    await Mulher.findByIdAndDelete(request.params.id)
    response.json ({message: 'A mulher foi deletada com sucesso!'})
  }catch (erro){
    console.log(erro)
  }
  }


  app.use(router.get('/mulheres', mostraMulheres)) //configurando rota GET / mulheres
app.use(router.post('/mulheres', criaMulher)) //configurando rota POST / mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) //configurando rota PATCH / mulheres
app.use(router.delete('/mulheres/:id', deletaMulher)) //configurando rota DELETE / mulheres

//PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}

app.listen(porta, mostraPorta) //servidor ouvindo a porta 3333
