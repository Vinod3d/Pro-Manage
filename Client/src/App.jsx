import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/user/login/Login'
import Register from './pages/user/register/register'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
