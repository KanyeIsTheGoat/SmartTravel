import { Route, Routes } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Home from './HomeLogica'

function App() {

  return (
    <div className='text-white h-[100vh] flex justify-center items-center bg-cover' style={{"backgroundImage": "url('src/Componentes/Log/assats/gpt.png')"}}>
      <Routes>
        <Route path='/' element={<Home/>}></Route> 
        <Route path='/Login' element={<Login/>}></Route> 
        <Route path='/Register' element={<Register/>}></Route> 
      </Routes>
    </div>
  )
}

export default App