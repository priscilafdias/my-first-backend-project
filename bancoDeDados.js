const mongoose = require('mongoose');
require('dotenv').config()

async function conectaBancoDeDados(){
    try {
        console.log("Conectando ao banco de dados...")

        await mongoose.connect(process.env.MONGO_URL)
    
        console.log("Conectado ao banco de dados!")
}catch (error){
    console.log("Erro ao conectar no banco de dados!")
    console.log(error)
}
}
module.exports = conectaBancoDeDados
