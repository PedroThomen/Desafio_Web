import React from 'react';
import '../styles/whatsapp-button.css';

function WhatsAppButton() {
  return (
    <a 
      href="https://api.whatsapp.com/send?phone=42998599191&text=Quero%20fazer%20um%20agendamento%20hoje!"
      className="btn-whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      data-aos="zoom-in-up" 
      data-aos-delay="400"
    >
      <img src="/assets/whatssapp.svg" alt="Botão whatsapp" />
      <span className="tooltip-text">Agende seu horário</span>
    </a>
  );
}

export default WhatsAppButton; 