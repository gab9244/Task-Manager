const mongoose = require('mongoose')
const {Schema, model} = mongoose   


//Temos que criar um modelo para que possamos enviar os dados do post para o banco de dados, nesse caso enviaremos o titulo E conteudo

const  PostSchema = new Schema ({
    title:String,
    content:String
},{
     //timestamps é um atalho para dois outros campos, createdAt e updatedAt
    //createAt Este campo registra a data e hora de quando o documento foi salvo pela primeira vez no banco de dados. É definido uma vez durante a criação e permanece inalterado depois
    //updatedAt Este campo registra a data e hora da última atualização do documento. O Mongoose atualizará automaticamente este campo sempre que você modificar e salvar o documento

    timestamps:true,
}
)


const PostModel = model('Post', PostSchema)

module.exports = PostModel
