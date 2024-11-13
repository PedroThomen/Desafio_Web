import React from 'react';
import '../styles/main.css';

function Main() {
  return (
    <div className="container">
      <div className="content-box">
        <h2>Barbearia</h2>
        <div className="form-group">
          <input type="text" placeholder="Nome" />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email" />
        </div>
        <button>Entrar</button>
      </div>
    </div>
  );
}

export default Main; 