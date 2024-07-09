import { useContext, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
const apiURL = import.meta.env.VITE_REACT_APP_API_URL;

export const CreateTask = () => {
  // As state variables title and content 
  const [title, setTaskTitle] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {userInfo} = useContext(UserContext);
  const {setTaskContent} = useContext(UserContext)


  const newTask = async (ev: { preventDefault: () => void }) => {
    //FormData é um objeto que nos ajuda a mandar dados, fornecendo um conjunto de chaves e valores que representão campos de formularios e seus valores, ele é essencial para construir solicitações para mandar dados usando métodos como Post atraves do fetch.
    // Nesse caso usamos FormData para criar um objeto que é constituido pelo titulo e conteudo das tarefas
    const data = new FormData();
    data.set("title", title);
    data.set("content", content);
    //Usamos um if para validamos a existencia do userInfo, por causa do TS
    if (userInfo?.username) {
      data.set("username", userInfo.username);
    }
    ev.preventDefault();
      //Aqui fazemos uma solicitação post onde mandamos como body um objeto(FormData) que possui tanto o titulo da tarefa quando o seu conteúdo e o nome do usuário. Mandamos o nome do usuário, pois o usamos ele em uma outra solicitação para encontrar todas as tarefas do usuário
    const response = await fetch(`${apiURL}/post`, {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((taskData)=>{
        setTaskContent(taskData)
      })
      setRedirect(true);
    }
  };

  if (redirect == true) {
    return <Navigate to={"/"} />;
  }
  return (
    //Quando enviamos o formulário os dados da tarefa são colocados nas state varialbe de acordo
    <form onSubmit={newTask}>
      <h1>Create Task</h1>
      <input
        type="text"
        placeholder="Task name"
        value={title}
        onChange={(ev) => setTaskTitle(ev.target.value)}
      />
      <Editor
        apiKey="id8j23ghu2p0ywt03er7vo2q3md82l625n16u5ce7a20ecjh"
        value={content}
        id="Editor"
        //É necessário substituir onChange por onEditorChange por causa da api que estamos usando
        onEditorChange={(newValue) => setContent(newValue)}
        init={{
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
        }}
      />
      <button className="press-button">New Task</button>
    </form>
  );
};
