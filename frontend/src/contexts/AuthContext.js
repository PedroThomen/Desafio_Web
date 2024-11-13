import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../services/firebase';
import { setCookie, removeCookie } from '../services/cookieService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setCookie('authToken', token);
        setUser(user);
      } else {
        removeCookie('authToken');
        removeCookie('userEmail');
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 