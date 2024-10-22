import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/user/login/Login'
import Register from './pages/user/register/register'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <ToastContainer position='top-right' />
    </BrowserRouter>
  )
}

export default App
