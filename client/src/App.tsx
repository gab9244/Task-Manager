import { Routes, Route } from "react-router-dom";
import { LayOut } from "./LayOut";
import { Registration } from "./Registration";
import { LogIng } from "./LogIng";
import { Home } from "./Home";
import { UserContextProvider } from "./UserContext";
import { CreateTask } from "./CreateTask";
import { Completed } from "./Completed";

export const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        {/* Se colocamos todos os Routes dentro do Route do LayOut todos as páginas terão o Header nalas */}
        <Route path="/" element={<LayOut />}>
          <Route path="/" element={<Home />}/>
          <Route path="/Registration" element={<Registration />} />
          <Route path="/LogIng" element={<LogIng />} />
          <Route path="/CreateTask" element={<CreateTask />} />
          <Route path="/Completed" element={<Completed />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};
