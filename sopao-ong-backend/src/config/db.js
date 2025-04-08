const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Desativa a verificação do certificado (comum em provedores hospedados)
  },
});

module.exports = pool;