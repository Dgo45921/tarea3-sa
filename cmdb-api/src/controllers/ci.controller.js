const db = require('../models/db');

exports.createCI = async (req, res) => {
  const {
    name, ci_type_id, description, serial_number, version,
    acquisition_date, status, physical_location, owner, change_date,
    change_description, documentation_link, incident_link, security_level_id,
    compliance_id, configuration_status, license_number, license_expiration
  } = req.body;



  try {
    const result = await db.query(
      `INSERT INTO configuration_items (
        name, ci_type_id, description, serial_number, version, acquisition_date,
        status, physical_location, owner, change_date, change_description,
        documentation_link, incident_link, security_level_id, compliance_id,
        configuration_status, license_number, license_expiration
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
      RETURNING *`,
      [
        name, ci_type_id, description, serial_number, version, acquisition_date,
        status, physical_location, owner, change_date, change_description,
        documentation_link, incident_link, security_level_id, compliance_id,
        configuration_status, license_number, license_expiration
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creando CI');
  }
};

exports.getAllCIs = async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM configuration_items`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error listando CIs');
  }
};

exports.getCIById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(`SELECT * FROM configuration_items WHERE id = $1`, [id]);
    if (result.rows.length === 0) return res.status(404).send('CI no encontrado');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error obteniendo CI');
  }
};

exports.updateCI = async (req, res) => {
  const { id } = req.params;
  const fields = Object.keys(req.body);
  const values = Object.values(req.body);

  const setClause = fields.map((field, i) => `${field} = $${i + 1}`).join(', ');

  try {
    const result = await db.query(
      `UPDATE configuration_items SET ${setClause}, updated_at = NOW() WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, id]
    );
    if (result.rows.length === 0) return res.status(404).send('CI no encontrado');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error actualizando CI');
  }
};

exports.deleteCI = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(`DELETE FROM configuration_items WHERE id = $1 RETURNING *`, [id]);
    if (result.rows.length === 0) return res.status(404).send('CI no encontrado');
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error eliminando CI');
  }
};
