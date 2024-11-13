import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { removeCookie } from '../services/cookieService';
import '../styles/logout-button.css';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      removeCookie('authToken');
      removeCookie('userEmail');
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Sair
    </button>
  );
}

export default LogoutButton; 