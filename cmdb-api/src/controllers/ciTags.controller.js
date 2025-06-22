// controllers/ciTags.controller.js
const db = require('../models/db');

exports.getTagsForCI = async (req, res) => {
  try {
    const result = await db.query(`SELECT tag FROM ci_tags WHERE ci_id = $1`, [req.params.id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error obteniendo tags');
  }
};

exports.addTagToCI = async (req, res) => {
  const { tag } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO ci_tags (ci_id, tag) VALUES ($1, $2) RETURNING *`,
      [req.params.id, tag]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error agregando tag');
  }
};

exports.removeTagFromCI = async (req, res) => {
  try {
    await db.query(
      `DELETE FROM ci_tags WHERE ci_id = $1 AND tag = $2`,
      [req.params.id, req.params.tag]
    );
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error eliminando tag');
  }
};
