import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
const apiURL = import.meta.env.VITE_REACT_APP_API_URL;

export const LogIng = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  //Usamos useContext para poder passar dados entre os nossos components, nesse caso estamos usando UserContext(O modelos dos dados ) como valor do hook useContext que nos permite passar os dados e setUserInfo funciona como uma state variable patão, mas nesse caso que queremos que o valor passado dentro de setUserInfo seja utilizado em outros componentes
  //Como podemos ver setUserInfo pega os dados da solicitação de fetch a api, os dados são id, nome de usuário e senha
  const { setUserInfo } = useContext(UserContext);

  const login = async (ev: { preventDefault: () => void }) => {
    ev.preventDefault();
    //Aqui estamos fazendo uma solicitação fetch POST, onde temos como objetivo mandar o username e password para o nosso backend e lá a solicitação pega os dados do body que mandamos e os usa para buscar por um usuário usando o username para fazer a busca , então usamos uma solicitão post não para mandar dados para o banco de dados, mas sim para podemos mandar ao nosso backend os dados, já que solicitações do tipo Post podem mandar um body e é nesse body que mandamos os dados: req.body
    const response = await fetch(`${apiURL}/LogIng`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      //É necessário adicionar credentials a solicitação para que possamos trabalhar com senhas
      credentials: "include",
    });
    //Todos os dados estão sendo passados para o userInfo para que possamos usa-los nos nosso elementos
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("Wrong credentials");
    }
  };
  if (redirect == true) {
    return <Navigate to={"/"} />;
    
  }
  return (
    <form onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="UserName"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        name=""
        id=""
        placeholder="Password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button className="press-button">Entrar</button>
    </form>
  );
};
