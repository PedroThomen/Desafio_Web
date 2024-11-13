import { Navigate } from 'react-router-dom';
import { auth } from '../services/firebase';

function PrivateRoute({ children }) {
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute; 