
//Dividindo a solicitação de registro
//Primeiro precisamos criar um novo projeto no mongodb:
// Vá nos projetos e click em novo projeto, depois de escolher um nome e informar os usuarios crie um novo cluster. Faça as seguintes escolhas: 
// escolhar a opção gratis, ter um nome ao cluster, aperte o botão para continuar
// Agora criaremos um nova conexão: em Set up connection security copier a senha e var para a proxima etapa: 
// Em Choose a connection method apenas copie a sua string de conexão algo como: mongodb+srv://<username>:<password>@cluster3.wpjhnkp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3 
// Pronto Agora é só usar colocar a sua senha e nome de usuário no lugar certo da sua string de conexão




const express = require('express')
// Cors é usado para que possamos fazer solicitações de uma página para outra
const  cors = require('cors')
//Usar é o modelo que usamos para os dados do usuário que colocaremos no banco de dados
const User = require('./models/User.cjs')
const app = express()
const bcrypt = require('bcrypt')

const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    console.log('Origin:', origin); // Debugging line
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

const connectDB = require('./db/connect.cjs')

app.use(express.json())

const salt = bcrypt.genSaltSync(10)
require('dotenv').config()
//Essa solicitação post funciona da seguinte maneira. Primeiro pegamos do corpo da solicitação o username e a password, depois usamos try e catch e caso esse dados passem pelas especificações que fizemos no User.cjs enviamos um status de 200 e os dados ao banco de dados, caso contrario apenas retornamos status 400 e um json com o erro

app.post('/Registration', async (req,res) =>{
        const {username , password} = req.body
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)
        })
        res.status(200).json(userDoc)

    }catch(error){
        res.status(404).json(error)
    }
})

 const port = process.env.PORT || 4000
 const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () =>{
            console.log('Live on 4000')
        })
    } catch (error){
        console.log(error)
    }
 }
start()