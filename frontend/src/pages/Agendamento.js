import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../styles/agendamento.css';
import ConfirmacaoAgendamento from '../components/ConfirmacaoAgendamento';
import BackButton from '../components/BackButton';
import { retry } from '../utils/retry';

function Agendamento() {
  const [servico, setServico] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [error, setError] = useState('');
  const [showConfirmacao, setShowConfirmacao] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const user = auth.currentUser;
      if (!user) {
        setError('Usuário não autenticado');
        return;
      }

      const novoAgendamento = {
        clienteId: user.uid,
        clienteEmail: user.email,
        servico,
        data,
        horario,
        status: 'pendente',
        createdAt: new Date().toISOString()
      };

      await retry(async () => {
        await addDoc(collection(db, 'agendamentos'), novoAgendamento);
      }, 3);

      setShowConfirmacao(true);

    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      setError('Erro ao criar agendamento. Tente novamente.');
    }
  };

  return (
    <div className="agendamento-container">
      <BackButton />
      <div className="agendamento-box">
        <h2>Agendar Horário</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <select 
              value={servico} 
              onChange={(e) => setServico(e.target.value)}
              required
            >
              <option value="">Selecione o serviço</option>
              <option value="Corte Degradê">Corte Degradê - R$ 45,00</option>
              <option value="Barba Modelada">Barba Modelada - R$ 35,00</option>
              <option value="Corte Degradê + Barba">Corte + Barba - R$ 85,00</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="form-group">
            <select 
              value={horario} 
              onChange={(e) => setHorario(e.target.value)}
              required
            >
              <option value="">Selecione o horário</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
              <option value="18:00">18:00</option>
            </select>
          </div>

          <button type="submit">Confirmar Agendamento</button>
        </form>
      </div>
      {showConfirmacao && (
        <ConfirmacaoAgendamento
          servico={servico}
          data={data}
          horario={horario}
          onClose={() => {
            setShowConfirmacao(false);
            navigate('/');
          }}
        />
      )}
    </div>
  );
}

export default Agendamento; 