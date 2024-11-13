const admin = require('../config/firebase-admin');
const db = admin.firestore();

// Listar agendamentos do cliente
exports.listarAgendamentos = async (req, res) => {
    try {
        const agendamentosRef = db.collection('agendamentos');
        const snapshot = await agendamentosRef
            .where('clienteId', '==', req.user.uid)
            .orderBy('data')
            .orderBy('horario')
            .get();

        const agendamentos = [];
        snapshot.forEach(doc => {
            agendamentos.push({ id: doc.id, ...doc.data() });
        });
        
        res.json(agendamentos);
    } catch (error) {
        console.error('Erro ao listar agendamentos:', error);
        res.status(500).json({ error: 'Erro ao buscar agendamentos' });
    }
};

// Criar novo agendamento
exports.criarAgendamento = async (req, res) => {
    try {
        const { servico, data, horario, valor } = req.body;
        
        const novoAgendamento = {
            clienteId: req.user.uid,
            servico,
            data,
            horario,
            valor,
            status: 'pendente',
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('agendamentos').add(novoAgendamento);
        res.status(201).json({ id: docRef.id, ...novoAgendamento });
    } catch (error) {
        console.error('Erro ao criar agendamento:', error);
        res.status(400).json({ error: 'Erro ao criar agendamento' });
    }
};

// Atualizar agendamento
exports.atualizarAgendamento = async (req, res) => {
    try {
        const agendamentoRef = db.collection('agendamentos').doc(req.params.id);
        const doc = await agendamentoRef.get();
        
        if (!doc.exists) {
            return res.status(404).json({ error: 'Agendamento não encontrado' });
        }

        const agendamento = doc.data();
        if (agendamento.clienteId !== req.user.uid) {
            return res.status(401).json({ error: 'Não autorizado' });
        }

        await agendamentoRef.update(req.body);
        const atualizado = await agendamentoRef.get();
        
        res.json({ id: atualizado.id, ...atualizado.data() });
    } catch (error) {
        console.error('Erro ao atualizar agendamento:', error);
        res.status(400).json({ error: 'Erro ao atualizar agendamento' });
    }
};

// Cancelar agendamento
exports.cancelarAgendamento = async (req, res) => {
    try {
        const agendamentoRef = db.collection('agendamentos').doc(req.params.id);
        const doc = await agendamentoRef.get();
        
        if (!doc.exists) {
            return res.status(404).json({ error: 'Agendamento não encontrado' });
        }

        const agendamento = doc.data();
        if (agendamento.clienteId !== req.user.uid) {
            return res.status(401).json({ error: 'Não autorizado' });
        }

        await agendamentoRef.update({ status: 'cancelado' });
        res.json({ message: 'Agendamento cancelado com sucesso' });
    } catch (error) {
        console.error('Erro ao cancelar agendamento:', error);
        res.status(400).json({ error: 'Erro ao cancelar agendamento' });
    }
}; 