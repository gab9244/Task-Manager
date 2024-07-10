import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
const apiURL = import.meta.env.VITE_REACT_APP_API_URL;

//É necessário usar interface para definimos o formado de TaskInfo, nesse caso é necessário, pois só depois que pegamos os dados é que as propríedade que usaremos para renderizar as tarefas exitiram
interface Task {
  title: string;
  content: string;
  _id: number;
}

export const PostTask = () => {
  const [TaskInfo, setTaskInfo] = useState<Task []>([]);
  const { userInfo } = useContext(UserContext);
  const {taskContent} = useContext(UserContext)
  // Essa solicitação fetch só será realizada caso consigamos pegar os dados dos usuário (o que fazemos com o uso de contexto), como podemos perceber no caminho para o end point colocamos o username do usuário, isso é necessário, pois é uma maneira de pagar o username do usuário sem ter que colocar um body na solicitação, o que é necessário nesse caso, pois essa é uma solicitação get e nela não é possivel mandar um body como dados, nesse caso mandariamos o username, além disso fazemos isso dessa maneira, pois assim podemos pegar o username dos params da solicitação(req.params), depois de conseguimos achar todas as tarefas do usuário colocamos elas no TaskInfo/array vazia. Como ultimo ponto tenho que falar que essa solicitão sempre será feita quando o valor de userInfo(Quando o usuário logar) for alterado
  useEffect(() => {
    if (userInfo && userInfo.username) {
      fetch(`${apiURL}/post/${userInfo.username}`, {
        credentials: "include", // Faz com que os cookies sejam mandados
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network not responding");
          }
          return response.json();
        })
        .then((taskinfo) => {
          setTaskInfo(taskinfo);
        })
        .catch((error) => {
          console.error("Thats was a problem with your fetch operation", error);
        });
    }
  }, [userInfo]);

  //CompleteTask tem como objetivo mandar a tarefa clicada para a página completed
  //A solução que me vem a mente é criar uma nova coleção para as tarefas concluidas, remover a tarefa escolhida das demais e coloca-la na nova coleção das tarefas completas

  //CompleteTask é uma função que tem como objetivo pegar o conteudo da tarefa desejada e criar um novo objeto/Tarefa em outra coleção do mongoDB.
  //CompleteTask faz o mesmo que a função que usamos para criar uma tarefa, mas não vamos criar uma nova tarefa, mas sim pegar os dados de uma já existente para pegar os dados ou inves de criar uma nova tarefa, passamos o id da tarefa como parâmetro da função

  const CompleteTask = async (id: number) => {
    if(taskContent && taskContent.title ){
    const data = new FormData();
    data.set("title", taskContent.title);
    data.set("content", taskContent.content);
    if (userInfo?.username) {
      data.set("username", userInfo.username);
    }

    const response = await fetch(`${apiURL}/completed`, {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      
      DeleteTask(id)
    }}
  };

  
  //DeleteTask é uma função assincrona que usamos para mandar um solicitação delete para o backend
  //DeleteTask é executada assim que apertarmos o botão de delete, ela recebe o id da tarefa como parâmetro
  //Por ser uma solicitação do tipo delete náo é possivel mandar um body com o id para o backend, então mandamos o id pela url
  //Para removemos as tarefas deletadas das demais, usamos um if onde caso a solicitação seja um sucesso e a tarefa seja deletada pelo backend, mudamos o o formado de TaskInfo(A array que contém todas as tarefas) usando filter e removendo todas as tarefas que possuem um _id diferente do id enviado como parâmetro para a função
  const DeleteTask = async (id: number) =>{
    const response  = await fetch(`${apiURL}/delete/${id}`, {
      method:'DELETE',
      credentials: 'include'
    })

    if(response.ok){
      setTaskInfo((prevTasks) => prevTasks.filter((task) => task._id !== id));
    }
  }

  //Removir essa função, já que a função para deletar um tarefa já fazia o mesmo que Completed, então não faz sentido criar tanto uma função quanto uma solicitação que fazem a mesma coisa.

  // const Completed = async (id:number) =>{
  //   const response  = await fetch(`${apiURL}/CompledDelete/${id}`, {
  //     method:'DELETE',
  //     credentials: 'include'
  //   })

  //   if(response.ok){
  //     setTaskInfo((prevTasks) => prevTasks.filter((task) => task._id !== id));
  //   }
  // }

  //Caso as informações necessário não estejam nos input, apenas retornaremos nada

  if (!TaskInfo) return "";
  return (
    <>
    {/* Para que possamos mostrar todas as tarefas usaremos o método map, como TaskInfo é uma state variable com valor inicial sendo uma array vazia podemos usar o map para criar uma task por objeto que estiver na array e cada objeto possui os dados da tarefa  */}
      {TaskInfo.map((task, index) => (
        // O parâmetro task será um objeto na array e para cada objeto/ elemento da array uma tarefa é criada
        <div className="task" key={index}>
          <div className="taskHeader">
            <h3>{task.title}</h3>
            <div className="taskBtns">
              <button className="completeTask" onClick={ () =>CompleteTask(task._id)}></button>
              <button className="deleteTask" onClick={ () => DeleteTask(task._id)}></button>
            </div>
          </div>
          {/* Usamos a propríedade abaixo para mostrar os dados da tarefa como texto */}
          <div dangerouslySetInnerHTML={{ __html: task.content }}></div>
        </div>
      ))}
    </>
  );
};
