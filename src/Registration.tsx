const apiURL = import.meta.env.VITE_REACT_APP_API_URL;

import { useState } from "react";

export const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // register é uma função assincrona que é executada assim que enviamos o form, caso os dados enviados sejam aceitos eles seram adicionados ao nosso banco de dados e uma mensagem aparecerá na tela, caso contrario uma mensagem de erro aparecerá

  const register = async (ev: { preventDefault: () => void }) => {
    ev.preventDefault();
    const response = await fetch(`${apiURL}/Registration`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status == 200) {
      alert("You have been registrated");
    } else {
      alert("Registration haw fail");
    }
  };

  return (
    <main>
      <form onSubmit={register}>
      <h1>Registration</h1>
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
