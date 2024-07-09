const apiURL = import.meta.env.VITE_REACT_APP_API_URL;

import { useState } from "react";
//como criar colocar um usuario no banco de dados

export const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // register é uma função assincrona que é executada assim que enviamos o form, caso os dados enviados sejam aceitos eles seram adicionados ao nosso banco de dados e uma mensagem aparecerá na tela, caso contrario uma mensagem de erro aparecerá

  const register = async (ev: { preventDefault: () => void }) => {
    //Usamos preventDefault para previnir que o formulario seja realmente enviado e com isso recarreque a página
    ev.preventDefault();
    //response é usada para fazemos a solicitação post para a api ${apiURL}/Registration que envia tanto o username quanto a senha para o banco  de dados
    const response = await fetch(`${apiURL}/Registration`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    //Se a solicitação ter certo retornamos um alerta de sucesso
    if (response.status == 200) {
      alert("You have been registrated");
    } else {
      alert("Registration haw fail");
    }
  };

  return (
    <main>
      {/* Quando apertamos no botão para enviar o formulário a função que faz a solicitação post é executada */}
      <form onSubmit={register}>
      <h1>Registration</h1>
      {/* Para que possamos enviar o username e password para a api usamos o evento onchange e para cada mudança que fizemos no input atualizaremos o valor da state variable que representa a password e o username */}
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
      <button className="press-button">Registrar</button>
      </form>
    </main>
  );
};
