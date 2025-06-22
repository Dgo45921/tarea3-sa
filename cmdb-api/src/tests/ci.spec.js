const request = require('supertest');
const app = require('../app');

let createdCIId;
let childCIId;

describe('CMDB API', () => {
  // ------------------ CREATE CI ------------------
  test('Crear un CI', async () => {
    const response = await request(app)
      .post('/api/cis')
      .send({
        name: "ServidorTest",
        ci_type_id: 1,
        description: "Servidor de pruebas",
        serial_number: "SN000000",
        version: "v1.0",
        acquisition_date: "2023-01-01",
        status: "Activo",
        physical_location: "Datacenter A",
        owner: "Equipo de QA",
        change_date: "2023-01-02",
        change_description: "Creación inicial",
        documentation_link: "https://doc.test/manual",
        incident_link: "https://inc.test/issue",
        security_level_id: 1,
        compliance_id: 1,
        configuration_status: "Aprobado",
        license_number: "LIC9999",
        license_expiration: "2024-01-01"
      });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("ServidorTest");
    createdCIId = response.body.id;
  });

  // ------------------ GET ALL CIs ------------------
  test('Obtener todos los CIs', async () => {
    const response = await request(app).get('/api/cis');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // ------------------ GET CI BY ID ------------------
  test('Obtener CI por ID', async () => {
    const response = await request(app).get(`/api/cis/${createdCIId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdCIId);
  });

  // ------------------ UPDATE CI ------------------
  test('Actualizar un CI', async () => {
    const response = await request(app)
      .put(`/api/cis/${createdCIId}`)
      .send({ version: "v1.1" });
    expect(response.status).toBe(200);
    expect(response.body.version).toBe("v1.1");
  });

  // ------------------ TAG CI ------------------
  test('Agregar tag a CI', async () => {
    const response = await request(app)
      .post(`/api/cis/${createdCIId}/tags`)
      .send({ tag: "DEV" });
    expect(response.status).toBe(201);
  });

  test('Obtener tags de CI', async () => {
    const response = await request(app).get(`/api/cis/${createdCIId}/tags`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // ------------------ RELATIONSHIPS ------------------
  test('Crear otro CI como hijo', async () => {
    const response = await request(app)
      .post('/api/cis')
      .send({
        name: "AppTest",
        ci_type_id: 2,
        description: "App relacionada",
        version: "v2.0",
        acquisition_date: "2023-03-01",
        status: "Activo",
        owner: "Equipo de QA",
        change_date: "2023-03-02",
        change_description: "Creación app",
        security_level_id: 1,
        compliance_id: 1,
        configuration_status: "Aprobado"
      });
    expect(response.status).toBe(201);
    childCIId = response.body.id;
  });

  test('Relacionar CI padre e hijo', async () => {
    const response = await request(app)
      .post(`/api/cis/${createdCIId}/relationships`)
      .send({ child_id: childCIId });
    expect(response.status).toBe(201);
  });

  test('Obtener relaciones del CI', async () => {
    const response = await request(app).get(`/api/cis/${createdCIId}/relationships`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // ------------------ CHANGELOG ------------------
  test('Registrar un cambio', async () => {
    const response = await request(app)
      .post(`/api/cis/${createdCIId}/changelog`)
      .send({ change_summary: "Prueba de auditoría" });
    expect(response.status).toBe(201);
  });

  test('Ver historial de cambios', async () => {
    const response = await request(app).get(`/api/cis/${createdCIId}/changelog`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // ------------------ DELETE CI ------------------
  test('Eliminar CI hijo', async () => {
    const response = await request(app).delete(`/api/cis/${childCIId}`);
    expect(response.status).toBe(204);
  });

  test('Eliminar CI padre', async () => {
    const response = await request(app).delete(`/api/cis/${createdCIId}`);
    expect(response.status).toBe(204);
  });
});
