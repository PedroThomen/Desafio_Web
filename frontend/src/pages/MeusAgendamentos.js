import React, { useState, useEffect } from 'react';
import { db, auth } from '../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import '../styles/meus-agendamentos.css';

function MeusAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate('/login');
          return;
        }

        const agendamentosRef = collection(db, 'agendamentos');
        const q = query(
          agendamentosRef, 
          where("clienteId", "==", user.uid)
        );
        
        const querySnapshot = await getDocs(q);
        const agendamentosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setAgendamentos(agendamentosData.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        ));
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgendamentos();
  }, [navigate]);

  return (
    <div className="meus-agendamentos-container">
      <BackButton />
      <div className="meus-agendamentos-box">
        <h2>Meus Agendamentos</h2>
        
        {loading ? (
          <div className="loading">Carregando...</div>
        ) : agendamentos.length === 0 ? (
          <p className="no-agendamentos">Você não possui agendamentos</p>
        ) : (
          <div className="agendamentos-list">
            {agendamentos.map(agendamento => (
              <div key={agendamento.id} className="agendamento-card">
                <div className="agendamento-header">
                  <h3>{agendamento.servico}</h3>
                  <span className={`status ${agendamento.status}`}>
                    {agendamento.status}
                  </span>
                </div>
                <div className="agendamento-info">
                  <p><strong>Data:</strong> {new Date(agendamento.data).toLocaleDateString()}</p>
                  <p><strong>Horário:</strong> {agendamento.horario}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MeusAgendamentos; 