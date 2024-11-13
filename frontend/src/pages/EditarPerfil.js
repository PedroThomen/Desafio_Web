import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../services/firebase';
import { doc, getDoc, updateDoc, deleteDoc, collection, query, where, getDocs, } from 'firebase/firestore';
import { updateEmail, deleteUser } from 'firebase/auth';
import BackButton from '../components/BackButton';
import '../styles/editar-perfil.css';
function EditarPerfil() {

  const [novoEmail, setNovoEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const navigate = useNavigate();

  // Monitor de status online/offline
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const user = auth.currentUser;
        if (!user) {
          setLoading(false);
          navigate('/login');
          return;
        }

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setNovoEmail(user.email || '');
          setTelefone(userData.telefone || '');
        } else {
          // Se o documento não existe, crie um novo
          await updateDoc(doc(db, "users", user.uid), {
            email: user.email,
            telefone: ''
          });
          setNovoEmail(user.email || '');
          setTelefone('');
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        if (error.message.includes('offline')) {
          setError("Você está offline. Os dados serão atualizados quando houver conexão.");
        } else {
          setError("Erro ao buscar dados: " + error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData();
      } else {
        setLoading(false);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const user = auth.currentUser;
    if (!user) return;

    try {
      if (novoEmail !== user.email) {
        await updateEmail(user, novoEmail);
      }
      
      await updateDoc(doc(db, "users", user.uid), {
        email: novoEmail,
        telefone: telefone
      });
      
      navigate('/');
    } catch (error) {
      console.error('Erro:', error);
      if (error.code === 'auth/requires-recent-login') {
        setError("Por favor, faça login novamente para alterar o email");
        navigate('/login');
      } else {
        setError("Erro ao atualizar perfil: " + error.message);
      }
    }
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        // Deletar dados do Firestore
        await deleteDoc(doc(db, "users", user.uid));
        // Deletar usuário do Authentication
        await deleteUser(user);
        // Deletar agendamentos do usuário
        const agendamentosRef = collection(db, 'agendamentos');
        const q = query(agendamentosRef, where("clienteId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        navigate('/login');
      } catch (error) {
        console.error('Erro ao deletar conta:', error);
        setError("Erro ao deletar conta: " + error.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="editar-perfil-container">
        <div className="loading">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="editar-perfil-container">
      <BackButton />
      <div className="editar-perfil-box">
        <h2>Editar Perfil</h2>
        {!isOnline && (
          <div className="offline-warning">
            Você está offline. Algumas funcionalidades podem estar indisponíveis.
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={novoEmail}
              onChange={(e) => setNovoEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn-salvar">
            Salvar Alterações
          </button>
        </form>

        {!showConfirmDelete ? (
          <button 
            onClick={() => setShowConfirmDelete(true)}
            className="btn-deletar"
          >
            Deletar Conta
          </button>
        ) : (
          <div className="confirm-delete">
            <p>Tem certeza que deseja deletar sua conta?</p>
            <div className="confirm-delete-buttons">
              <button 
                onClick={handleDeleteAccount}
                className="btn-confirmar-delete"
              >
                Sim, deletar
              </button>
              <button 
                onClick={() => setShowConfirmDelete(false)}
                className="btn-cancelar"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditarPerfil;