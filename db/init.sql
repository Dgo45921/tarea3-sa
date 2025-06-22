-- Borrar en orden seguro si es necesario reiniciar
DROP TABLE IF EXISTS ci_tags, ci_relationships, change_logs, configuration_items, ci_types, security_levels, compliance_levels CASCADE;

-- Tabla de niveles de seguridad
CREATE TABLE security_levels (
    id SERIAL PRIMARY KEY,
    level VARCHAR(50) UNIQUE NOT NULL
);

-- Tabla de cumplimiento (compliance)
CREATE TABLE compliance_levels (
    id SERIAL PRIMARY KEY,
    level VARCHAR(50) UNIQUE NOT NULL
);

-- Tipos de elementos de configuración (CI)
CREATE TABLE ci_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    required_fields TEXT[] -- Campos obligatorios por tipo
);

-- Elementos de configuración (CIs)
CREATE TABLE configuration_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ci_type_id INTEGER REFERENCES ci_types(id),
    description TEXT,
    serial_number VARCHAR(100),
    version VARCHAR(50),
    acquisition_date DATE,
    status VARCHAR(50),
    physical_location VARCHAR(255),
    owner VARCHAR(255),
    change_date DATE,
    change_description TEXT,
    documentation_link TEXT,
    incident_link TEXT,
    security_level_id INTEGER REFERENCES security_levels(id),
    compliance_id INTEGER REFERENCES compliance_levels(id),
    configuration_status VARCHAR(50),
    license_number VARCHAR(100),
    license_expiration DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Relaciones entre CIs (padre/hijo)
CREATE TABLE ci_relationships (
    id SERIAL PRIMARY KEY,
    parent_id INTEGER REFERENCES configuration_items(id) ON DELETE CASCADE,
    child_id INTEGER REFERENCES configuration_items(id) ON DELETE CASCADE,
    relation_type VARCHAR(100) DEFAULT 'depends_on'
);

-- Etiquetas de ambientes
CREATE TABLE ci_tags (
    id SERIAL PRIMARY KEY,
    ci_id INTEGER REFERENCES configuration_items(id) ON DELETE CASCADE,
    tag VARCHAR(50) CHECK (tag IN ('DEV', 'QA', 'PROD'))
);

-- Historial de cambios
CREATE TABLE change_logs (
    id SERIAL PRIMARY KEY,
    ci_id INTEGER REFERENCES configuration_items(id) ON DELETE CASCADE,
    changed_at TIMESTAMP DEFAULT NOW(),
    change_summary TEXT
);

-- ========================
-- INSERTS SEED
-- ========================

-- Niveles de Seguridad
INSERT INTO security_levels (level) VALUES 
('Bajo'), 
('Medio'), 
('Alto');

-- Niveles de Cumplimiento
INSERT INTO compliance_levels (level) VALUES 
('No Cumple'), 
('Cumple'), 
('Pendiente');

-- Tipos de CI
INSERT INTO ci_types (name, required_fields) VALUES 
('Hardware', ARRAY['name', 'serial_number', 'version']),
('Software', ARRAY['name', 'version']),
('Base de Datos', ARRAY['name', 'version']);

-- Ejemplo de CIs

-- Servidor1
INSERT INTO configuration_items (
    name, ci_type_id, description, serial_number, version, acquisition_date,
    status, physical_location, owner, change_date, change_description,
    documentation_link, incident_link, security_level_id, compliance_id,
    configuration_status, license_number, license_expiration
) VALUES (
    'Servidor1', 
    1, 
    'Servidor de Aplicaciones', 
    'SN123456', 
    'v1.0', 
    '2022-01-01', 
    'Activo', 
    'Sala de Servidores 1', 
    'Equipo de Infraestructura', 
    '2022-02-01', 
    'Actualización de Software', 
    'https://docs.servidor1.com/manual', 
    'https://incidentes.com/servidor1', 
    3, 
    2, 
    'Aprobado', 
    'ABC123', 
    '2023-01-01'
);

-- Aplicación contabilidad
INSERT INTO configuration_items (
    name, ci_type_id, description, version, acquisition_date,
    status, physical_location, owner, change_date, change_description,
    documentation_link, incident_link, security_level_id, compliance_id,
    configuration_status, license_number, license_expiration
) VALUES (
    'Aplicación', 
    2, 
    'Aplicación de contabilidad', 
    'v2.5', 
    '2022-03-15', 
    'Activo', 
    'Servidor1', 
    'Equipo de Desarrollo', 
    '2022-04-01', 
    'Parche de Seguridad', 
    'https://docs.app.com/tecnica', 
    'https://incidentes.com/app', 
    2, 
    2, 
    'Aprobado', 
    'XYZ456', 
    '2024-01-01'
);

-- Base de Datos1
INSERT INTO configuration_items (
    name, ci_type_id, description, version, acquisition_date,
    status, physical_location, owner, change_date, change_description,
    documentation_link, incident_link, security_level_id, compliance_id,
    configuration_status, license_number, license_expiration
) VALUES (
    'Base de Datos1', 
    3, 
    'PostgreSQL para contabilidad', 
    'v13.2', 
    '2022-01-10', 
    'Activo', 
    'Sala de Servidores 1', 
    'DBA Team', 
    '2022-03-01', 
    'Actualización de motor DB', 
    'https://docs.db.com/postgres', 
    'https://incidentes.com/db', 
    3, 
    2, 
    'Aprobado', 
    'DB7890', 
    '2025-01-10'
);

-- Relaciones
-- Servidor1 -> Base de Datos1
INSERT INTO ci_relationships (parent_id, child_id) VALUES (1, 3);
-- Aplicación -> Base de Datos1
INSERT INTO ci_relationships (parent_id, child_id) VALUES (2, 3);

-- Etiquetas
INSERT INTO ci_tags (ci_id, tag) VALUES (1, 'PROD'), (2, 'QA'), (3, 'PROD');

-- Historial de cambios
INSERT INTO change_logs (ci_id, change_summary) VALUES 
(1, 'Instalación inicial del servidor.'),
(1, 'Actualización de sistema operativo a versión 1.1.'),
(2, 'Aplicación actualizada con parche de seguridad.'),
(3, 'Actualización de versión PostgreSQL.');
