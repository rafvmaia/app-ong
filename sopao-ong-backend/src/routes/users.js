const express = require('express');
const router = express.Router(); // Definir o router corretamente
const pool = require('../config/db');

let broadcastUpdate = () => {};

router.setBroadcastUpdate = (func) => {
  broadcastUpdate = func;
};

router.post('/users', async (req, res) => {
  let { name, birthdate, address, phone, active, bolsa_familia, attends_church, church_name } = req.body;
  active = active === 'true' || active === true;
  bolsa_familia = bolsa_familia === 'true' || bolsa_familia === true;
  attends_church = attends_church === 'true' || attends_church === true;
  church_name = church_name || null;

  console.log('Dados recebidos (parsed):', { name, birthdate, address, phone, active, bolsa_familia, attends_church, church_name });

  if (!name || !birthdate || !address || !phone) {
    return res.status(400).json({ error: 'Campos obrigatórios (name, birthdate, address, phone) não podem ser nulos ou vazios' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (name, birthdate, address, phone, active, bolsa_familia, attends_church, church_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, birthdate, address, phone, active, bolsa_familia, attends_church, church_name]
    );
    console.log('Usuário inserido:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro no backend:', err.stack);
    res.status(500).json({ error: err.message });
  }
});

router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erro ao listar:', err.stack);
    res.status(500).json({ error: err.message });
  }
});

router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  console.log('req.body completo:', req.body);

  const { name, birthdate, address, phone, bolsa_familia, attends_church, church_name } = req.body;

  console.log('Valores desestruturados:', { name, birthdate, address, phone, bolsa_familia, attends_church, church_name });

  const updates = {};
  if (name !== undefined && name !== null) updates.name = name;
  if (birthdate !== undefined && birthdate !== null) updates.birthdate = birthdate;
  if (address !== undefined && address !== null) updates.address = address;
  if (phone !== undefined && phone !== null) updates.phone = phone;
  if (bolsa_familia !== undefined && bolsa_familia !== null) updates.bolsa_familia = bolsa_familia === true || bolsa_familia === 'true';
  if (attends_church !== undefined && attends_church !== null) updates.attends_church = attends_church === true || attends_church === 'true';
  if (church_name !== undefined && church_name !== null) updates.church_name = church_name || null;

  console.log('Atualizações a serem aplicadas:', updates);

  if (Object.keys(updates).length === 0) {
    try {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      console.log('Usuário retornado (sem atualizações):', result.rows[0]);
      return res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error('Erro ao buscar usuário:', err.stack);
      return res.status(500).json({ error: err.message });
    }
  }

  const setClause = Object.keys(updates)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(', ');
  const query = `UPDATE users SET ${setClause} WHERE id = $${Object.keys(updates).length + 1} RETURNING *`;
  const values = [...Object.values(updates), id];

  console.log('Query gerada:', query);
  console.log('Valores para query:', values);

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    console.log('Usuário atualizado (result.rows[0]):', result.rows[0]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar no backend:', err.stack);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; // Exportar o router