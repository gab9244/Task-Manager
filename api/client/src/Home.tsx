import { useContext } from "react";
import { PostTask } from "./PostTask";
import { UserContext } from "./UserContext";

export const Home = () => {
  const {userInfo} = useContext(UserContext)
  return (
    <>
  {/* Usamos os dados do usuário para fazer uma renderização condicional, nesse caso mostramos as tarefas caso elas exitem, caso contrarío mostramos um h1 */}
      <main className="tasks">
        {userInfo && userInfo.username ? (
            <PostTask />
        ):
        (
          <h1 id="EmptyH1">Please Loging to Create your Tasks</h1>
        )}
      </main>
    </>
  );
};
