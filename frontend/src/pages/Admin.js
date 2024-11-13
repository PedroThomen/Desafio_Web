import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const snapshot = await getDocs(usersCollection);
        const usersList = snapshot.docs.map(doc => ({
          uid: doc.id,
          ...doc.data()
        }));
        setUsers(usersList);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      setUsers(users.filter(user => user.uid !== userId));
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Gerenciar Usuários</h2>
      {users.length === 0 ? (
        <p>Nenhum usuário encontrado</p>
      ) : (
        users.map(user => (
          <div key={user.uid} className="user-item">
            <span>{user.email}</span>
            <button onClick={() => handleDeleteUser(user.uid)}>
              Deletar
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Admin; 