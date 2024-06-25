import { Link } from "react-router-dom";
import { useState } from "react";

//Como vamos criar o seletor de icone do usuario
//Primeiro
export const Header = () => {
  const [UserIcon, setUserIcon] = useState<string | null>(null);

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
      <Link to={"/"} className="links">Home</Link>
      <Link to={"/Registration"} className="links">
        Registration
      </Link>

      <Link to={"/LogIng"} className="links">
        Login
      </Link>
    </header>
  );
};
