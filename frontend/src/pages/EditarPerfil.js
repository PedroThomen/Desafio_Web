import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../services/firebase';
import { doc, getDoc, updateDoc, deleteDoc, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { updateEmail, deleteUser } from 'firebase/auth';
import BackButton from '../components/BackButton';
import '../styles/editar-perfil.css';
import { useAuth } from '../contexts/AuthContext';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

function EditarPerfil() {
  const [formData, setFormData] = useState({
    email: '',
    telefone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFormData({
            email: userData.email || '',
            telefone: userData.telefone || ''
          });
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setError('Erro ao carregar dados do usuário');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!user) throw new Error('Usuário não autenticado');

      // Atualiza email no Authentication se necessário
      if (formData.email !== user.email) {
        await updateEmail(user, formData.email);
      }

      // Atualiza dados no Firestore
      await updateDoc(doc(db, "users", user.uid), {
        email: formData.email,
        telefone: formData.telefone,
        updatedAt: serverTimestamp()
      });

      navigate('/perfil');
    } catch (error) {
      console.error('Erro:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setError('');
    setLoading(true);
    
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('Usuário não autenticado');

      // Primeiro deletar agendamentos
      const agendamentosRef = collection(db, 'agendamentos');
      const q = query(agendamentosRef, where("clienteId", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      
      const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      // Depois deletar dados do usuário no Firestore
      await deleteDoc(doc(db, "users", currentUser.uid));

      // Por último, deletar a conta do Authentication
      await deleteUser(currentUser);

      // Redirecionar para login após sucesso
      navigate('/login');
    } catch (error) {
      console.error('Erro ao deletar conta:', error);
      setError("Erro ao deletar conta: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-spinner">Carregando...</div>;
  }

  return (
    <div className="editar-perfil-container">
      <BackButton />
      <div className="editar-perfil-box">
        <h2>Editar Perfil</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              id="telefone"
              value={formData.telefone}
              onChange={(e) => setFormData({...formData, telefone: e.target.value})}
              required
            />
          </div>
          
          <button type="submit" className="btn-salvar" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>

        <button 
          className="delete-account-btn"
          onClick={() => setShowConfirmDelete(true)}
        >
          Deletar Conta
        </button>

        {showConfirmDelete && (
          <ConfirmDeleteModal
            onConfirm={handleDeleteAccount}
            onCancel={() => setShowConfirmDelete(false)}
          />
        )}
      </div>
    </div>
  );
}

export default EditarPerfil;