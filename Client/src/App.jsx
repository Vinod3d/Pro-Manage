import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Login from './pages/user/login/Login.jsx';
import Register from './pages/user/register/Register.jsx';
import NotFound from './pages/not_found/NotFound';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { checkAuthSession } from './store/slices/userSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      await dispatch(checkAuthSession());
      setLoading(false);
    };
    initializeAuth();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />}  />} />
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer position='top-right' />
    </BrowserRouter>
  );
}

export default App;
