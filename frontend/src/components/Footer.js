import React from 'react';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-icons">
        <a href="https://instagram.com/suabarbearia" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-instagram fa-2x"></i>
        </a>
        <a href="https://facebook.com/suabarbearia" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-facebook fa-2x"></i>
        </a>
        <a href="https://tiktok.com/@suabarbearia" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-tiktok fa-2x"></i>
        </a>
      </div>

      <div>
        <img 
          src="/assets/logo.svg" 
          alt="Logo barbearia"
        />
      </div>

      <p>Copyright 2024 | J&P Barber - Todos direitos reservados.</p>
    </footer>
  );
}

export default Footer; 