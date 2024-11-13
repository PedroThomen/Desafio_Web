import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import EditarPerfil from '../pages/EditarPerfil';
import Agendamento from '../pages/Agendamento';
import Admin from '../pages/Admin';
import PrivateRoute from '../components/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/editar-perfil',
    element: <PrivateRoute><EditarPerfil /></PrivateRoute>
  },
  {
    path: '/agendamento',
    element: <PrivateRoute><Agendamento /></PrivateRoute>
  },
  {
    path: '/admin',
    element: <PrivateRoute><Admin /></PrivateRoute>
  }
]);

export default router;