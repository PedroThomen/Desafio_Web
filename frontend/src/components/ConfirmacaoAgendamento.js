import React from 'react';
import '../styles/confirmacao-agendamento.css';
import { useNavigate } from 'react-router-dom';

function ConfirmacaoAgendamento({ servico, data, horario, onClose }) {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate('/');
  };

  return (
    <div className="confirmacao-overlay">
      <div className="confirmacao-modal" data-aos="zoom-in">
        <div className="confirmacao-content">
          <div className="check-icon">✓</div>
          <h2>Agendamento Confirmado!</h2>
          <p>Seu horário foi agendado com sucesso</p>
          
          <div className="detalhes-agendamento">
            <p><strong>Serviço:</strong> {servico}</p>
            <p><strong>Data:</strong> {new Date(data).toLocaleDateString()}</p>
            <p><strong>Horário:</strong> {horario}</p>
          </div>

          <button onClick={handleClose} className="btn-fechar">
            Voltar para Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmacaoAgendamento; 