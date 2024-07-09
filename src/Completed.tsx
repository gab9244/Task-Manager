import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

const apiURL = import.meta.env.VITE_REACT_APP_API_URL;


interface Completed {
  title: string;
  content: string;
  _id: number;
}



export const Completed = () => {
  const [CompletedInfo, setCompletedInfo] = useState<Completed []>([]);
  // const {taskContent} = useContext(UserContext)
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    if (userInfo && userInfo.username) {
      fetch(`${apiURL}/completed/${userInfo.username}`, {
        credentials: "include", // Faz com que os cookies sejam mandados
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network not responding");
          }
          return response.json();
        })
        .then((taskinfo) => {
          setCompletedInfo(taskinfo);
        })
        .catch((error) => {
          console.error("Thats was a problem with your fetch operation", error);
        });
    }
  }, [userInfo]);

  //Manda uma solicitação de delete para o backend
  const DeleteTask = async (id: number) =>{
    const response  = await fetch(`${apiURL}/completeDelete/${id}`, {
      method:'DELETE',
      credentials: 'include'
    })

    if(response.ok){
      setCompletedInfo((prevTasks) => prevTasks.filter((task) => task._id !== id));
    }
  }


  return (
   <main className="tasks">
     <>
    {/* Para que possamos mostrar todas as tarefas usaremos o método map, como TaskInfo é uma state variable com valor inicial sendo uma array vazia podemos usar o map para criar uma task por objeto que estiver na array e cada objeto possui os dados da tarefa  */}
      {CompletedInfo.map((task, index) => (
        // O parâmetro task será um objeto na array e para cada objeto/ elemento da array uma tarefa é criada
        <div className="task" key={index}>
          <div className="taskHeader">
            <h3>{task.title}</h3>
            <div className="taskBtns">
              <button className="deleteTask" onClick={() => DeleteTask(task._id)}></button>
            </div>
          </div>
          {/* Usamos a propríedade abaixo para mostrar os dados da tarefa como texto */}
          <div dangerouslySetInnerHTML={{ __html: task.content }}></div>
        </div>
      ))}
    </>
   </main>
  )
}
