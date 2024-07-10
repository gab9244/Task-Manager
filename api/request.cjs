
//Dividindo a solicitação de registro
//Primeiro precisamos criar um novo projeto no mongodb:
// Vá nos projetos e click em novo projeto, depois de escolher um nome e informar os usuários crie um novo cluster. Faça as seguintes escolhas: 
// escolhar a opção gratis, ter um nome ao cluster, aperte o botão para continuar
// Agora criaremos um nova conexão: em Set up connection security copier a senha e var para a proxima etapa: 
// Em Choose a connection method apenas copie a sua string de conexão algo como: mongodb+srv://<username>:<password>@cluster3.wpjhnkp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3 
// Pronto Agora é só você colocar a sua senha e nome de usuário no lugar certo da sua string de conexão
//Depois de ter criador um cluster vamos criar os arquivos: 

//Como o nosso projeto funciona:
// (X) Começando pelo header: temos um input onde o usuário pode escolher um arquivo é usa-lo como foto de perfil, um link para uma página onde o usuário pode se registrar e um link para o usuário logar.
// (x) Depois que o usuário logar o mesmo será enviado para o home onde todos as tarefas to usuário estaram e os link para logar e registrar seram trocados pelos link de criar tarefas e de tasks completas
// (x) Quando o usuário clicar no link de criação de página ele será enviado para a página de criação e nela haverá os inputs de texto para um titulo e o que é a tarefa
// () Quando o usuário clicar no link para ver as tarefas já completas, ele será enviado para a página onde todas as tarefas já completas por ele estaram
// (x) Quando o usuário clicar no botão para deletar o post ele será deletado tanto do home quanto do banco de dados
// () Quando o usuário clicar no botão para completar uma tarefa ela deve ser enviada para a página complete

// () se o usuário clicar no botão de deletar na página complete, a tarefa também será deletada


//As páginas: 
//Por enquanto apenas as páginas de logar e de registrar já estão funcionado

//useEffect é usado para realizar alguma ação depois que algo acontecer, como pegar dados com fetch e depois que os dados forem pegos atualizar alguma coisa como contextos

const express = require('express')
// Cors é usado para que possamos fazer solicitações de uma página para outra
const  cors = require('cors')
//Usar é o modelo que usamos para os dados do usuário que colocaremos no banco de dados e ele também permiti que usemos os método do mongoose como create que cria um novo objeto no banco de dados
const User = require('./models/User.cjs')
const Task = require('./models/Task.cjs')
//Completed é o modelo usado para as tarefas completas
const Completed = require('./models/Completed.cjs')
const multer = require('multer'); //é necessário baixar o multer para que possamos passar multiplos dados para o mongodb

const app = express()
const upload = multer(); // For parsing multipart/form-data

//baixe jsonwebtoken e cookie-parser
const path = require('path')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
//bcrypt é usado para criptrografar a senha
const bcrypt = require('bcrypt')


//Quando usamos o express.json() em todas as solicitações(usando o método use to express) facilitamos o uso dos dados json que são enviados ou solicitados das apis
app.use(express.json())
//Usamos os cookieParser() nas solicitações para os cookies sejam passados para as solicitações e com isso podemos usa-lo para mander o nosso projeto seguro 
app.use(cookieParser())

const allowedOrigins = ['https://task-manager-q6ci.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', 'https://theblog-api.onrender.com');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,HEAD');
  res.header('Access-Control-Allow-Headers', '*');
  next()
});

// Importamos a função que ferá conexão com o banco de dados
const connectDB = require('./db/connect.cjs')


// "salt" é um valor aleatório que é adicionado a uma senha ou a qualquer outro dado antes de ser processado por uma função de hash.
//O salt nada mais é do que um valor aleatório adicionado ao input de uma função hash para garantir que o mesmo input sempre será diferente
const salt = bcrypt.genSaltSync(10)
const secret = 'wewrerererercvdwffwfe'
require('dotenv').config()


app.use(express.static(path.join(process.cwd(), '/client/dist')))




//Essa solicitação post funciona da seguinte maneira. Primeiro pegamos do corpo da solicitação o username e a password, depois usamos try e catch e caso esses dados passem pelas especificações que fizemos no User.cjs enviamos um status de 200 e os dados ao banco de dados, caso contrario apenas retornamos status 400 e um json com o erro

app.post('/Registration', async (req,res) =>{
        const {username , password} = req.body
    try {
      //Usamos o método create do mongoose para criar um objeto com os dados da solicitação de post
        const userDoc = await User.create({
          //O objeto consistirar do nome do usuário e de uma senha hash que será gerada pela função hashSync da api de segurança bcrypt
            username,
            //Aqui usamos uma função hash para garantir a segurança do nosso projeto
            // Uma função hash é um algoritmo que transforma uma entrada (como uma senha) em uma saída fixa de comprimento específico (o hash)
            //O que estamos fazendo é pegar a senha e combina-la com o salt(Os 10 caracteres que sempre seram diferentes a cada utilização)
            password: bcrypt.hashSync(password, salt)
        })
        //Casos os dados passem pelas especificaçõesque fizemos no schema do mongoose o objeto com os dados será enviado ao banco de dados no mongoDB
        res.status(200).json(userDoc)

    }catch(error){
      //Se houver algum erro retornamos um status 404 com um json de erro
        res.status(404).json(error)
    }
})

//Essa solicitação é usada para encontrar o usuário/objeto no banco de dados e retorna-lo
app.post('/LogIng', async (req,res) =>{
  //Se estiver usando promesas como await use try and catch
  //Primeiro pegamos os dados do corpo da solicitação
  try {
    const {username, password} = req.body
    // Em seguida usamos await para encontrar o usuário/objeto que possuir a propriedade username igual a que pegamos da solicitação
     const userDoc = await User.findOne({username})
     //Com a senha em mãos a comparemos com a senha hash que mandamos para o banco de dados(é a senha mais o salt(10 digitos diferentes))
     const pass = bcrypt.compareSync(password, userDoc.password)
     //Caso pass seja true returnamos os dados 
     if(pass){
       jwt.sign(
        {username, id:userDoc._id}, //carga que será adicionada no token
        secret, //Secredo que será usado para assinar o token
        {}, //opções, nesse caso está vazio
        (error, token)=>{ //Função call back
        if(error) throw error //Caso aconteça um error durante a criação do token
        res.cookie('token', token).json({ //Manda o token como um cookie HTTP
          id:username._id, //Manda o id do usuário
          username // Manda o nome do usuário
        })
       })
     }
  }catch(error){
    res.status(404).json(error) //Se houver um erro o retorne como json
  }
   
}
)
//Apenas limpamos os cookies 
app.post('/Logout', (req,res) =>{
  res.cookie('token','').json('ok')
})


//Temos que usar upload.none() para que possamos mandar varios dados ao banco de dados e também o usamos, pois a nossa solicitação apenas contêm texto e nenhum arquivo

//upload.none() passa os campos de dados na solicitação e os torna disponiveis no req.body
//upload.none() é uma middleware usada para lidar com solicitações que apenas possuem texto de formularios enviados via FormData do frontend
app.post('/post', upload.none() , async(req,res) =>{
        const {title, content,username} = req.body
        try {
         const TaskInfo = await Task.create({title,content,username})
         res.status(201).json(TaskInfo)
        }catch(error){res.status(401).json(error)}
})

  //Eu quero que o usuário apenas possa ver as suas tarefas. Como eu posso fazer isso?
  // Usamos uma solicitação get para pegar as tarefas usando o nome do usuário para encontrar todas as tarefas feitas por ele, por ser uma solicitação do tipo get não é possivel passar um body com o nome do usuário como valor, então na url da solicitação colocamos o username e o pegamos nos params da solicitação({ username } = req.params).
  // Em seguida Usamos o método find e sort  mais o modelo das tarefas para pegar todas as tarefas que possuam a propriedade username e tenham o mesmo valor que passamos nos params.Por fim retornamos as tarefas em um json
app.get('/post/:username', async (req,res) =>{
  const { username } = req.params;
      try{
        //Usando o sort dessa maneira conseguimos organizar as tarefas de uma maneira que coloque as criadas recendemente antes das demais
        //O -1 em createdAt, isso que dizer que as tarefas seram ordenadas pelo campo createdAt com as tarefas criadas mais recentemente no topo
      const TaskData = await Task.find({username}).sort({ createdAt: -1 })
      res.status(200).json(TaskData)
    }catch(error){
      res.status(500).json(error)
    }
})
  //Usamos o método delete para deletar tarefas
  //Para deletarmos a tarefa certa, pegamos o id da tarefa e o passamos na url da solicitação depois usamos o id para deletar a tarefa dejegada
app.delete('/delete/:_id', async (req,res) =>{
    const {_id} = req.params
      try {
        const DeleteTask = await Task.deleteOne({_id})
        res.status(200).json(DeleteTask)
      }catch(error){
        res.status(401).json(error)
      }
})

//completed pega os dados de um tarefa completa e os coloca na coleção das tarefas completas, faz o mesmo que a solicitação post, a unica diferença é para qual coleção no mongoDB que estamos mandando dados, nesse caso estamos mandando dados para a nova coleção Completed

app.post('/completed', upload.none() , async(req,res) =>{
  const {title, content,username} = req.body
  try {
   const CompledInfo = await Completed.create({title,content,username})
   res.status(201).json(CompledInfo)
  }catch(error){res.status(401).json(error)}
})

//Essa solicitação pega todas as tarefas completas pelo usuário
//Fazemos isso usando o username do usuário para pegar todas as tarefas que possuam o seu username

app.get('/completed/:username', async (req,res) =>{
  const { username } = req.params;
      try{
      const CompledTasks = await Completed.find({username}).sort({ createdAt: -1 })
      res.status(200).json(CompledTasks)
    }catch(error){
      res.status(500).json(error)
    }
})


//Essa solicitação não é necessária, já que a minha logica de pegar os dados da tarefa completa, coloca-los em uma nova coleção, usa-los na página copleted e depois deleta-los da coleção anterior, não é necessário criar outra solicitação de delete, já que a que possuimos faz a mesma coisa
app.delete('/completeDelete/:_id', async (req,res) =>{
  const {_id} = req.params
  try{
    const FindTask = await Completed.deleteOne({_id})
    res.status(203).json(FindTask)
  }catch(error){
    res.status(404).json(error)
  }
})


//Essa solicitação será executada sempre que uma solicitação for feita, ela retorna o nosso front-end compilado na pasta dist. Em outras palavras sempre que uma solicitação for feita retornamos o nosso front-end compilado
app.get('*', (req,res) =>{
  res.sendFile(path.join(process.cwd(), '/client/dist/index.html'))
})

// port é a url do nosso backend
 const port = process.env.PORT || 4000
 //start é uma função assíncrona que usa promise para nos conectar ao banco de dados no mongoDB
 const start = async () =>{
    try {
      // connectDB é uma função que importamos do componente connect que pega um url e tenta conecta-la ao banco de dados mongoDB
      // Nesse caso a url é a nossa variavel ambiental que possui como valor a url que nos conecta ao banco de dados do mongoDB
        await connectDB(process.env.MONGO_URI)
        //Para rodar o nosso backend usamos port que é uma variavel que carrega como valor a variable ambiental PORT se ela existir caso contrario seu valor será 4000
        app.listen(port, () =>{
            console.log('Live on 4000')
        })
    } catch (error){
        console.log(error)
    }
 }
start()