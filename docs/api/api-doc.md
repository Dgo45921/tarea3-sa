# Documentacion REST API - Tarea 3
## Software avanzado - junio 2024
### Diego Andres Huite Alvarez - 202003585
---

## Requerimientos
- **Node.js:** Entorno de ejecución para JavaScript en el backend.
- **Express:** Framework web utilizado en el backend.
- **PostgreSQL** Motor de la base de datos con la cual se conecta el backend


---

## Endpoints

### CI (Configuration Items)

#### Crear un CI
- **POST** `/api/cis`
- **Body:**  
  ```json
  {
    "name": "ServidorTest",
    "ci_type_id": 1,
    "description": "Servidor de pruebas",
    "serial_number": "SN000000",
    "version": "v1.0",
    "acquisition_date": "2023-01-01",
    "status": "Activo",
    "physical_location": "Datacenter A",
    "owner": "Equipo de QA",
    "change_date": "2023-01-02",
    "change_description": "Creación inicial",
    "documentation_link": "https://doc.test/manual",
    "incident_link": "https://inc.test/issue",
    "security_level_id": 1,
    "compliance_id": 1,
    "configuration_status": "Aprobado",
    "license_number": "LIC9999",
    "license_expiration": "2024-01-01"
  }
  ```
- **Response:**  
  `201 Created`  
  Devuelve el CI creado.

---

#### Obtener todos los CIs
- **GET** `/api/cis`
- **Response:**  
  `200 OK`  
  Lista de CIs.

---

#### Obtener CI por ID
- **GET** `/api/cis/:id`
- **Response:**  
  `200 OK`  
  Objeto CI.

---

#### Actualizar un CI
- **PUT** `/api/cis/:id`
- **Body:**  
  Campos a actualizar (ejemplo: `{ "version": "v1.1" }`)
- **Response:**  
  `200 OK`  
  CI actualizado.

---

#### Eliminar un CI
- **DELETE** `/api/cis/:id`
- **Response:**  
  `204 No Content`

---

### Tags de CI

#### Obtener tags de un CI
- **GET** `/api/cis/:id/tags`
- **Response:**  
  `200 OK`  
  Lista de tags asociados al CI.

---

#### Agregar tag a un CI
- **POST** `/api/cis/:id/tags`
- **Body:**  
  ```json
  { "tag": "DEV" }
  ```
- **Response:**  
  `201 Created`  
  Tag agregado.

---

#### Eliminar tag de un CI
- **DELETE** `/api/cis/:id/tags/:tag`
- **Response:**  
  `204 No Content`

---

### Relaciones entre CIs

#### Obtener relaciones de un CI (hijos)
- **GET** `/api/cis/:id/relationships`
- **Response:**  
  `200 OK`  
  Lista de relaciones (hijos) del CI.

---

#### Crear relación padre-hijo
- **POST** `/api/cis/:id/relationships`
- **Body:**  
  ```json
  { "child_id": 2 }
  ```
- **Response:**  
  `201 Created`  
  Relación creada.

---

#### Eliminar relación padre-hijo
- **DELETE** `/api/cis/:id/relationships/:childId`
- **Response:**  
  `204 No Content`

---

### Historial de Cambios (ChangeLog)

#### Obtener historial de cambios de un CI
- **GET** `/api/cis/:id/changelog`
- **Response:**  
  `200 OK`  
  Lista de cambios del CI.

---

#### Registrar un cambio en un CI
- **POST** `/api/cis/:id/changelog`
- **Body:**  
  ```json
  { "change_summary": "Descripción del cambio" }
  ```
- **Response:**  
  `201 Created`  
  Registro de cambio creado.

---

## Notas

- Todos los endpoints devuelven errores con código `500` en caso de fallo interno.
- Los IDs deben ser enteros válidos.
- Los endpoints usan JSON para entrada y salida.
- La base de datos utilizada es PostgreSQL.

---

