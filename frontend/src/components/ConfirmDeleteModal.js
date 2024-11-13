import React from 'react';
import '../styles/confirm-delete-modal.css';

function ConfirmDeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirmar Exclusão</h3>
        <p>Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.</p>
        <div className="modal-buttons">
          <button 
            className="btn-cancelar"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button 
            className="btn-confirmar-delete"
            onClick={onConfirm}
          >
            Confirmar Exclusão
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal; 