import { Routes,Route } from 'react-router-dom'
import { LayOut } from './LayOut'
import { Registration } from './Registration'
import { LogIng } from './LogIng'
import { Home } from './Home'

export const App = () => {
  return (
    <Routes>
      {/* Se colocamos todos os Routes dentro do Route do LayOut todos as páginas terão o Header nalas */}
    <Route path='/' element ={<LayOut />}>
      <Route path='/' element = {<Home />} />
      <Route  path='/Registration' element ={<Registration/>}/>
      <Route  path='/LogIng' element ={<LogIng/>}/>
    </Route>

    </Routes>
  )
}

 