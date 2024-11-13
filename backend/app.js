// backend/app.js
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rotas
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

module.exports = app;
