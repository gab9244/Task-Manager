import { Outlet } from "react-router-dom";
import { Header } from './Header'


export const LayOut = () => {
  return (
    <div id="All">
        <Header />
        <Outlet />
    </div>
  )
}
