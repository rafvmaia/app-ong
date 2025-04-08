const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');

const app = express();

// Configurar CORS
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'PATCH'], allowedHeaders: ['Content-Type', 'Accept'] }));

// Configurar o parsing de JSON e form-urlencoded
app.use(express.json({ type: ['application/json', 'application/json; charset=UTF-8'], limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware para depuração (apenas registra informações, sem manipular o corpo)
app.use((req, res, next) => {
  console.log('Método:', req.method);
  console.log('URL:', req.url);
  console.log('Cabeçalhos:', req.headers);
  console.log('Corpo parseado (req.body):', req.body || '{}');
  next();
});

app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor na porta ${PORT}`));

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro:', err.stack);
  res.status(500).json({ error: 'Erro interno' });
});