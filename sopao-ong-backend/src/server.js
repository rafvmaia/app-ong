const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');
const pool = require('./config/db'); // Importar o pool para verificação de saúde

const app = express();

// Configurar CORS
app.use(cors({
  origin: '*', // Permissivo para desenvolvimento com Expo Go
  methods: ['GET', 'POST', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Accept'],
}));

// Configurar o parsing de JSON e form-urlencoded
app.use(express.json({ type: ['application/json', 'application/json; charset=UTF-8'], limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware para depuração (apenas registra inrformações, sem manipular o corpo)
app.use((req, res, next) => {
  console.log('Método:', req.method);
  console.log('URL:', req.url);
  console.log('Cabeçalhos:', req.headers);
  console.log('Corpo parseado (req.body):', req.body || '{}');
  next();
});

// Rota para a raiz (/) para evitar erros 404 nas verificações de saúde do Render
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Bem-vindo à API da ONG!' });
});

// Rota HEAD para verificações de saúde do Render
app.head('/', (req, res) => {
  res.status(200).end();
});

// Rota de health check para verificar a conexão com o banco de dados
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ status: 'OK', database: 'Connected' });
  } catch (err) {
    console.error('Erro no health check:', err);
    res.status(503).json({ status: 'Error', database: 'Disconnected', error: err.message });
  }
});

// Rotas da API
app.use('/api', userRoutes);

// Porta ajustada para o Render (o Render define process.env.PORT como 10000)
const PORT = process.env.PORT || 10000; // Alterado de 5000 para 10000 para refletir o padrão do Render
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor na porta ${PORT}`));

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro:', err.stack);
  if (process.env.NODE_ENV === 'development') {
    res.status(500).json({ error: err.message, stack: err.stack });
  } else {
    res.status(500).json({ error: 'Erro interno' });
  }
});