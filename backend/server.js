const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuração da sessão
app.use(session({
  secret: process.env.SESSION_SECRET || 'chave_secreta',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 1 dia
  }
}));

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/agendamentos', agendamentoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});