// backend/app.js
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const sessionConfig = require('./config/session');
const userRoutes = require('./routes/userRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(sessionConfig));

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/agendamentos', agendamentoRoutes);

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Erro interno do servidor' 
  });
});

module.exports = app;
