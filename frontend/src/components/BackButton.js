import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/back-button.css';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button 
      className="back-button" 
      onClick={() => navigate('/')}
      data-aos="fade-right"
    >
      ← Voltar
    </button>
  );
}

export default BackButton; 