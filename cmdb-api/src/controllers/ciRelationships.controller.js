// controllers/ciRelationships.controller.js
const db = require('../models/db');

exports.getRelationshipsForCI = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(`
      SELECT r.*, c.name as child_name
      FROM ci_relationships r
      JOIN configuration_items c ON c.id = r.child_id
      WHERE r.parent_id = $1
    `, [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error obteniendo relaciones');
  }
};

exports.addRelationship = async (req, res) => {
  const { child_id } = req.body;
  try {
    const result = await db.query(`
      INSERT INTO ci_relationships (parent_id, child_id) VALUES ($1, $2)
      RETURNING *
    `, [req.params.id, child_id]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creando relación');
  }
};

exports.removeRelationship = async (req, res) => {
  try {
    const { id, childId } = req.params;
    await db.query(`
      DELETE FROM ci_relationships WHERE parent_id = $1 AND child_id = $2
    `, [id, childId]);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error eliminando relación');
  }
};
