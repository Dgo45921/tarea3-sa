// controllers/changeLogs.controller.js
const db = require('../models/db');

exports.getChangeLogForCI = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM change_logs WHERE ci_id = $1 ORDER BY changed_at DESC`,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error obteniendo historial');
  }
};

exports.addChangeLog = async (req, res) => {
  const { change_summary } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO change_logs (ci_id, change_summary) VALUES ($1, $2) RETURNING *`,
      [req.params.id, change_summary]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creando registro');
  }
};
