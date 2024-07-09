import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
const apiURL = import.meta.env.VITE_REACT_APP_API_URL;

//Como vamos criar o seletor de icone do usuario
//Primeiro
export const Header = () => {
  const [UserIcon, setUserIcon] = useState<string | null>(null);
  // Para podemos usar os dados do usuário em outro componete os passamos usando usecontext
  const { userInfo, setUserInfo } = useContext(UserContext);

  //Como estamos programando no typeScript é necessário informar os tipos de parâmetros, nesse caso é uma elemento que tem o evento change nele
  //A função tem como objetivo Pegar o arquivo selecionado pelo input file e torna-lo no valor da imagem userIcon
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //file acessa a lista de arquivos selecionadas pelo usuario
    //e.target.files é um objeto FileList e [0] pega o primeiro arquivo dessa lisata
    const file = e.target.files?.[0];
    //Depois usamos um argumento onde perguntamos de a lista de arquivos existe
    //Caso existar Criamos um novo objeto FileReader, esse objeto é usado para ler o conteudo do arquivo assincronamente
    if (file) {
      const reader = new FileReader();
      //Quando carregamos o arquivo mudamos oa valor da state variable para o nome do arquivo como uma string
      //Porfim Usamos o objeto reader mais o método readAsDataURL justo do arquivo para
      reader.onload = () => {
        setUserIcon(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  //Quando o usuário apertar o botão para sair de sua conta uma simples solicitação é enviada para epi Logout, lá apenas limpamos os cookies e para removemos as informações do usuário definimos o valor de userInfo como null,  além disso também mandamos o usuário para o Home, apenas mandados o usuário para o home depois de sabemos que ele não está mais logado e com isso não mostramos as tarefas
  const Logout = () => {
    fetch(`${apiURL}/Logout`, {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    return <Navigate to={'/'} />

  };
  // if(userInfo && userInfo.username  == null){
  //   return <Navigate to={'/Home'} />
  // }
  //Quando logamos o valor da state userInfo do contexto todos os componentes que utilizam o contexto são renderizado e é por isso que a rendezição condicional funciona, já que quando alteramos o valore do contexto no login também alteramos ele aqui
  const username = userInfo?.username
  return (
    <header>
      <label htmlFor="fileInput" id="userIcon">
        {/* Enquanto o valor de UserIcon for null eu quero que uma image de mais seja mostrada e a partir do momento que o valor mudar o arquivo escolhido será mostrado no icone do usuario*/}
        {UserIcon ? (
          <img src={UserIcon} alt="" id="iconImage" />
        ) : (
          <img src="./src/assets/plus.png" alt="" id="addIcon" />
        )}

        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    {/* Usando renderização condicional para renderizar os links */}
      {username? (
        <>
          <Link to={"/"} className="links">
            Home
          </Link>
          <Link to={"/CreateTask"} className="links">
            Create Task
          </Link>
          <Link to={"/Completed"} className="links">
            Completed
          </Link>
          <a onClick={Logout} id="logout">Logout</a>
        </>
      ) : (
        <>
          <Link to={"/Registration"} className="links">
            Registration
          </Link>
          <Link to={"/LogIng"} className="links">
            Login
          </Link>
        </>
      )}
    </header>
  );
};
