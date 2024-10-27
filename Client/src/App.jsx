import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/user/login/Login.jsx'
import Register from './pages/user/register/Register.jsx'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/not_found/NotFound';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PrivateRoute element={<Dashboard/>}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <ToastContainer position='top-right' />
    </BrowserRouter>
  )
}

export default App
