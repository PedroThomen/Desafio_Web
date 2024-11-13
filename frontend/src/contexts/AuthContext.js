import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../services/firebase';
import { setCookie, removeCookie } from '../services/cookieService';
import { onAuthStateChanged, getIdToken } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await getIdToken(user, true);
          setCookie('authToken', token);
          setCookie('userEmail', user.email);
          setUser(user);
        } catch (error) {
          console.error('Erro ao obter token:', error);
          setUser(null);
        }
      } else {
        removeCookie('authToken');
        removeCookie('userEmail');
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
} 