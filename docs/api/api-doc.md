# Documentacion REST API - Tarea 3
## Software avanzado - junio 2024
### Diego Andres Huite Alvarez - 202003585
---

## Requerimientos
- **Node.js:** Entorno de ejecución para JavaScript en el backend.
- **Express:** Framework web utilizado en el backend, sobre el cual se realizan las pruebas.
- **PostgreSQL** Motor de la base de datos con la cual se conecta el backend


---

## Endpoints

### CI (Configuration Items)

#### Crear un CI
- **POST** `/api/cis`
- **Body:**  
    ```json
    {
      "name": "Servidor test",
      "ci_type_id": 1,
      "description": "Servidor de Aplicaciones",
      "serial_number": "SN123456",
      "version": "v1.0",
      "acquisition_date": "2022-01-01",
      "status": "Activo",
      "physical_location": "Sala de Servidores 1",
      "owner": "Equipo de Infraestructura",
      "change_date": "2022-02-01",
      "change_description": "Actualización de Software",
      "documentation_link": "https://docs.servidor1.com/manual",
      "incident_link": "https://servicedesk/incidente123",
      "security_level_id": 1,
      "compliance_id": 1,
      "configuration_status": "Aprobado",
      "license_number": "ABC123",
      "license_expiration": "2023-01-01"
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



```json
  [
	{
		"id": 1,
		"name": "Servidor1",
		"ci_type_id": 1,
		"description": "Servidor de Aplicaciones",
		"serial_number": "SN123456",
		"version": "v1.0",
		"acquisition_date": "2022-01-01T06:00:00.000Z",
		"status": "Activo",
		"physical_location": "Sala de Servidores 1",
		"owner": "Equipo de Infraestructura",
		"change_date": "2022-02-01T06:00:00.000Z",
		"change_description": "Actualización de Software",
		"documentation_link": "https://docs.servidor1.com/manual",
		"incident_link": "https://incidentes.com/servidor1",
		"security_level_id": 3,
		"compliance_id": 2,
		"configuration_status": "Aprobado",
		"license_number": "ABC123",
		"license_expiration": "2023-01-01T06:00:00.000Z",
		"created_at": "2025-06-22T12:37:15.029Z",
		"updated_at": "2025-06-22T12:37:15.029Z"
	},
	{
		"id": 2,
		"name": "Aplicación",
		"ci_type_id": 2,
		"description": "Aplicación de contabilidad",
		"serial_number": null,
		"version": "v2.5",
		"acquisition_date": "2022-03-15T06:00:00.000Z",
		"status": "Activo",
		"physical_location": "Servidor1",
		"owner": "Equipo de Desarrollo",
		"change_date": "2022-04-01T06:00:00.000Z",
		"change_description": "Parche de Seguridad",
		"documentation_link": "https://docs.app.com/tecnica",
		"incident_link": "https://incidentes.com/app",
		"security_level_id": 2,
		"compliance_id": 2,
		"configuration_status": "Aprobado",
		"license_number": "XYZ456",
		"license_expiration": "2024-01-01T06:00:00.000Z",
		"created_at": "2025-06-22T12:37:15.079Z",
		"updated_at": "2025-06-22T12:37:15.079Z"
	},
	{
		"id": 3,
		"name": "Base de Datos1",
		"ci_type_id": 3,
		"description": "PostgreSQL para contabilidad",
		"serial_number": null,
		"version": "v13.2",
		"acquisition_date": "2022-01-10T06:00:00.000Z",
		"status": "Activo",
		"physical_location": "Sala de Servidores 1",
		"owner": "DBA Team",
		"change_date": "2022-03-01T06:00:00.000Z",
		"change_description": "Actualización de motor DB",
		"documentation_link": "https://docs.db.com/postgres",
		"incident_link": "https://incidentes.com/db",
		"security_level_id": 3,
		"compliance_id": 2,
		"configuration_status": "Aprobado",
		"license_number": "DB7890",
		"license_expiration": "2025-01-10T06:00:00.000Z",
		"created_at": "2025-06-22T12:37:15.129Z",
		"updated_at": "2025-06-22T12:37:15.129Z"
	},
	{
		"id": 4,
		"name": "Servidor1",
		"ci_type_id": 1,
		"description": "Servidor de Aplicaciones",
		"serial_number": "SN123456",
		"version": "v1.0",
		"acquisition_date": "2022-01-01T06:00:00.000Z",
		"status": "Activo",
		"physical_location": "Sala de Servidores 1",
		"owner": "Equipo de Infraestructura",
		"change_date": "2022-02-01T06:00:00.000Z",
		"change_description": "Actualización de Software",
		"documentation_link": "https://docs.servidor1.com/manual",
		"incident_link": "https://servicedesk/incidente123",
		"security_level_id": 1,
		"compliance_id": 1,
		"configuration_status": "Aprobado",
		"license_number": "ABC123",
		"license_expiration": "2023-01-01T06:00:00.000Z",
		"created_at": "2025-06-22T13:23:53.761Z",
		"updated_at": "2025-06-22T13:23:53.761Z"
	},
	{
		"id": 5,
		"name": "Servidor1",
		"ci_type_id": 1,
		"description": "Servidor de Aplicaciones",
		"serial_number": "SN123456",
		"version": "v1.0",
		"acquisition_date": "2022-01-01T06:00:00.000Z",
		"status": "Activo",
		"physical_location": "Sala de Servidores 1",
		"owner": "Equipo de Infraestructura",
		"change_date": "2022-02-01T06:00:00.000Z",
		"change_description": "Actualización de Software",
		"documentation_link": "https://docs.servidor1.com/manual",
		"incident_link": "https://servicedesk/incidente123",
		"security_level_id": 1,
		"compliance_id": 1,
		"configuration_status": "Aprobado",
		"license_number": "ABC123",
		"license_expiration": null,
		"created_at": "2025-06-22T13:25:26.885Z",
		"updated_at": "2025-06-22T13:25:26.885Z"
	},
	{
		"id": 7,
		"name": "Servidor test",
		"ci_type_id": 1,
		"description": "Servidor actualizado",
		"serial_number": "SN123456",
		"version": "v2.1",
		"acquisition_date": "2022-01-01T06:00:00.000Z",
		"status": "Activo",
		"physical_location": "Sala de Servidores 1",
		"owner": "Equipo de Infraestructura",
		"change_date": "2022-02-01T06:00:00.000Z",
		"change_description": "Actualización de Software",
		"documentation_link": "https://docs.servidor1.com/manual",
		"incident_link": "https://servicedesk/incidente123",
		"security_level_id": 1,
		"compliance_id": 1,
		"configuration_status": "Aprobado",
		"license_number": "ABC123",
		"license_expiration": "2023-01-01T06:00:00.000Z",
		"created_at": "2025-06-22T13:32:31.763Z",
		"updated_at": "2025-06-22T13:32:52.860Z"
	}
]

```


---

#### Obtener CI por ID
- **GET** `/api/cis/:id`
- **Request** `/api/cis/1`
- **Response:**  
  `200 OK`  
```json
{
	"id": 1,
	"name": "Servidor1",
	"ci_type_id": 1,
	"description": "Servidor de Aplicaciones",
	"serial_number": "SN123456",
	"version": "v1.0",
	"acquisition_date": "2022-01-01T06:00:00.000Z",
	"status": "Activo",
	"physical_location": "Sala de Servidores 1",
	"owner": "Equipo de Infraestructura",
	"change_date": "2022-02-01T06:00:00.000Z",
	"change_description": "Actualización de Software",
	"documentation_link": "https://docs.servidor1.com/manual",
	"incident_link": "https://incidentes.com/servidor1",
	"security_level_id": 3,
	"compliance_id": 2,
	"configuration_status": "Aprobado",
	"license_number": "ABC123",
	"license_expiration": "2023-01-01T06:00:00.000Z",
	"created_at": "2025-06-22T12:37:15.029Z",
	"updated_at": "2025-06-22T12:37:15.029Z"
}
```

---

#### Actualizar un CI
- **PUT** `/api/cis/:id`
- **Request**: `/api/cis/7`
- **Body:**  
```json
{
  "description": "Servidor actualizado",
  "version": "v2.1"
}
```

- **Response:**  
  `200 OK`  

```json
  {
	"id": 7,
	"name": "Servidor test",
	"ci_type_id": 1,
	"description": "Servidor actualizado",
	"serial_number": "SN123456",
	"version": "v2.1",
	"acquisition_date": "2022-01-01T06:00:00.000Z",
	"status": "Activo",
	"physical_location": "Sala de Servidores 1",
	"owner": "Equipo de Infraestructura",
	"change_date": "2022-02-01T06:00:00.000Z",
	"change_description": "Actualización de Software",
	"documentation_link": "https://docs.servidor1.com/manual",
	"incident_link": "https://servicedesk/incidente123",
	"security_level_id": 1,
	"compliance_id": 1,
	"configuration_status": "Aprobado",
	"license_number": "ABC123",
	"license_expiration": "2023-01-01T06:00:00.000Z",
	"created_at": "2025-06-22T13:32:31.763Z",
	"updated_at": "2025-06-22T13:32:52.860Z"
}
  
```

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


