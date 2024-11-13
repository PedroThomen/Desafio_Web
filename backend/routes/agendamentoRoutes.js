const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    listarAgendamentos,
    criarAgendamento,
    atualizarAgendamento,
    cancelarAgendamento
} = require('../controllers/agendamentoController');

router.use(protect);

router.route('/')
    .get(listarAgendamentos)
    .post(criarAgendamento);

router.route('/:id')
    .put(atualizarAgendamento)
    .delete(cancelarAgendamento);

module.exports = router; 