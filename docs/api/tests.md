# Documentacion REST API - Tarea 3
## Software avanzado - junio 2024
### Diego Andres Huite Alvarez - 202003585
---

## Herramientas utilizadas para los tests

- **Jest:** Framework de testing para JavaScript, utilizado para ejecutar y organizar las pruebas.
- **Supertest:** Librería para pruebas de endpoints HTTP, permite simular peticiones a la API de Express.
- **Node.js:** Entorno de ejecución para JavaScript en el backend.
- **Express:** Framework web utilizado en el backend, sobre el cual se realizan las pruebas.

---
## Estructura de los tests

Las pruebas están ubicadas en el directorio:
`/cmdb-api/src/tests`

---

## Descripción de los tests implementados

El archivo principal de pruebas es [`ci.spec.js`](../../cmdb-api/src/tests/ci.spec.js), el cual valida el funcionamiento de los endpoints principales de la API de CMDB. A continuación los casos princpales que se han cubiertto:

### 1. Creación de CI
- **Test:** Crear un CI.
- **Verifica:** Que el endpoint `/api/cis` permita crear un nuevo CI y retorne el objeto creado con status 201.

### 2. Consulta de CIs
- **Test:** Obtener todos los CIs.
- **Verifica:** Que el endpoint `/api/cis` retorne un array de CIs existentes.
- **Test:** Obtener CI por ID.
- **Verifica:** Que el endpoint `/api/cis/:id` retorne el CI correspondiente.

### 3. Actualización de CI
- **Test:** Actualizar un CI.
- **Verifica:** Que el endpoint `/api/cis/:id` permita modificar campos de un CI y retorne el CI actualizado.

### 4. Tags de CI
- **Test:** Agregar tag a CI.
- **Verifica:** Que el endpoint `/api/cis/:id/tags` permita asociar un tag a un CI.
- **Test:** Obtener tags de CI.
- **Verifica:** Que el endpoint `/api/cis/:id/tags` retorne los tags asociados al CI.

### 5. Relaciones entre CIs
- **Test:** Crear otro CI como hijo.
- **Verifica:** Que se pueda crear un CI adicional para relacionarlo.
- **Test:** Relacionar CI padre e hijo.
- **Verifica:** Que el endpoint `/api/cis/:id/relationships` permita asociar un CI hijo a un CI padre.
- **Test:** Obtener relaciones del CI.
- **Verifica:** Que el endpoint `/api/cis/:id/relationships` retorne las relaciones del CI.

### 6. Historial de cambios (ChangeLog)
- **Test:** Registrar un cambio.
- **Verifica:** Que el endpoint `/api/cis/:id/changelog` permita registrar un cambio para un CI.
- **Test:** Ver historial de cambios.
- **Verifica:** Que el endpoint `/api/cis/:id/changelog` retorne el historial de cambios del CI.

### 7. Eliminación de CIs
- **Test:** Eliminar CI hijo y padre.
- **Verifica:** Que el endpoint `/api/cis/:id` permita eliminar CIs y retorne el status 204.

