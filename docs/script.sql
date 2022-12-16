-- BASE DE DATOS
DROP DATABASE IF EXISTS NodeJS_Prima_Api_REST_MicroInventario;
CREATE DATABASE IF NOT EXISTS NodeJS_Prima_Api_REST_MicroInventario;
USE NodeJS_Prima_Api_REST_MicroInventario;

-- TABLE'S

DROP TABLE IF EXISTS Almacen;
CREATE TABLE IF NOT EXISTS Almacen
(
	id				INT				NOT	NULL				AUTO_INCREMENT	COMMENT 'Clave primaria',
	nombre			VARCHAR(120)	NOT	NULL								COMMENT 'Nombre del almacen',
	descripcion		VARCHAR(255)		NULL	DEFAULT	NULL				COMMENT 'Descripción del almacen',
	creado			DATETIME		NOT	NULL	DEFAULT NOW()				COMMENT 'Auditoría',
	editado			DATETIME			NULL	DEFAULT NULL				COMMENT	'Auditoría',
	CONSTRAINT		pkAlmacen		PRIMARY KEY(id),
	CONSTRAINT		ukNombreAlmacen	UNIQUE(nombre)
)COMMENT 'Tabla de almacen';

INSERT INTO Almacen (nombre) VALUES('Almacén general');
INSERT INTO Almacen (nombre) VALUES('Almacén demo 02');
INSERT INTO Almacen (nombre) VALUES('Almacén demo 03');
INSERT INTO Almacen (nombre) VALUES('Almacén demo 04');
INSERT INTO Almacen (nombre) VALUES('Almacén demo 05');
INSERT INTO Almacen (nombre) VALUES('Almacén demo 06');
INSERT INTO Almacen (nombre) VALUES('Almacén demo 07');
INSERT INTO Almacen (nombre) VALUES('Almacén demo 08');
INSERT INTO Almacen (nombre) VALUES('Almacén demo 09');
INSERT INTO Almacen (nombre) VALUES('Almacén demo 10');

DROP TABLE IF EXISTS Producto;
CREATE TABLE IF NOT EXISTS Producto
(
	id				INT				NOT	NULL				AUTO_INCREMENT	COMMENT 'Clave primaria',
	nombre			VARCHAR(120)	NOT	NULL								COMMENT 'Nombre del producto',
	descripcion		VARCHAR(255)		NULL	DEFAULT	NULL				COMMENT 'Descripción del producto',
	creado			DATETIME		NOT	NULL	DEFAULT NOW()				COMMENT 'Auditoría',
	editado			DATETIME			NULL	DEFAULT NULL				COMMENT	'Auditoría',
	CONSTRAINT		pkProducto		PRIMARY KEY(id),
	CONSTRAINT		ukNombreProducto	UNIQUE(nombre)
)COMMENT 'Tabla de producto';

INSERT INTO Producto (nombre) VALUES('Producto demo 01');
INSERT INTO Producto (nombre) VALUES('Producto demo 02');
INSERT INTO Producto (nombre) VALUES('Producto demo 03');
INSERT INTO Producto (nombre) VALUES('Producto demo 04');
INSERT INTO Producto (nombre) VALUES('Producto demo 05');
INSERT INTO Producto (nombre) VALUES('Producto demo 06');
INSERT INTO Producto (nombre) VALUES('Producto demo 07');
INSERT INTO Producto (nombre) VALUES('Producto demo 08');
INSERT INTO Producto (nombre) VALUES('Producto demo 09');
INSERT INTO Producto (nombre) VALUES('Producto demo 10');

DROP TABLE IF EXISTS Inventario;
CREATE TABLE IF NOT EXISTS Inventario
(
	id					INT				NOT	NULL				AUTO_INCREMENT	COMMENT 'Clave primaria',
	producto_id			INT				NOT	NULL								COMMENT	'Clave foranea de producto',
	almacen_id			INT				NOT	NULL								COMMENT	'Clave foranea de almacen',
	cantidad_capturado	FLOAT			NOT	NULL	DEFAULT	1					COMMENT 'Cantidad captutado',
	cantidad			FLOAT			NOT	NULL	DEFAULT	1					COMMENT 'Cantidad calculado',
	tipo				VARCHAR(15)		NOT	NULL								COMMENT	'Tipo [ingreso|egreso]',
	fecha				DATETIME		NOT	NULL	DEFAULT	NOW()				COMMENT	'Fecha de operación',
	nota				VARCHAR(255)		NULL	DEFAULT	NULL				COMMENT	'Nota',
	creado				DATETIME		NOT	NULL	DEFAULT NOW()				COMMENT 'Auditoría',
	editado				DATETIME			NULL	DEFAULT NULL				COMMENT	'Auditoría',
	cancelado			DATETIME			NULL	DEFAULT NULL				COMMENT	'Auditoría',
	CONSTRAINT			pkInventario		PRIMARY KEY(id),
	CONSTRAINT			fkInventarioProducto
		FOREIGN KEY(producto_id)		REFERENCES	Producto(id),
	CONSTRAINT			fkInventarioAlmacen
		FOREIGN KEY(almacen_id)		REFERENCES	Almacen(id)
	
)COMMENT 'Tabla de inventario';

DROP TABLE IF EXISTS ControlInventario;
CREATE TABLE IF NOT EXISTS ControlInventario
(
	id			INT				NOT	NULL				AUTO_INCREMENT	COMMENT 'Clave primaria',
	producto_id	INT				NOT	NULL								COMMENT	'Clave foranea de producto',
	almacen_id	INT				NOT	NULL								COMMENT	'Clave foranea de almacen',
	existencia	FLOAT			NOT	NULL	DEFAULT	0					COMMENT	'Cantidad actual',
	ingreso		FLOAT			NOT	NULL	DEFAULT	0					COMMENT	'Cantidad ingresado actual',
	egreso		FLOAT			NOT	NULL	DEFAULT	0					COMMENT	'Cantidad egreso actual',
	CONSTRAINT	pkControlInventario		PRIMARY KEY(id),
	CONSTRAINT	fkControlInventarioProducto
		FOREIGN KEY(producto_id)		REFERENCES	Producto(id),
	CONSTRAINT	fkControlInventarioAlmacen
		FOREIGN KEY(almacen_id)		REFERENCES	Almacen(id)
)COMMENT 'Tabla de control de inventario';

DELIMITER &&
-- * -----------------------------------
-- * PROCEDURE
-- *------------------------------------

DROP PROCEDURE IF EXISTS proc_inventario &&
CREATE PROCEDURE IF NOT EXISTS proc_inventario
(IN _almacen_id INT, IN _producto_id INT)
BEGIN

	DECLARE _ingreso FLOAT;
	DECLARE _egreso FLOAT;
	DECLARE _existencia FLOAT;
	DECLARE auxExiste INT;
	DECLARE id INT;

	SET _ingreso = 0;
	SET _egreso = 0;
	SET _existencia = 0;
	SET auxExiste = 0;
	SET id = 0;

	-- * Sumatoria ingreso
	SET _ingreso = (SELECT IFNULL(SUM(cantidad),0)
	FROM Inventario
	WHERE 1=1
		AND producto_id = _producto_id
		AND almacen_id = _almacen_id
		AND tipo = 'ingreso');
	-- * Sumatoria egreso
	SET _egreso = (SELECT IFNULL(SUM(cantidad),0)
	FROM Inventario
	WHERE 1=1
		AND producto_id = _producto_id
		AND almacen_id = _almacen_id
		AND tipo = 'egreso');
	-- * Calculo de existencia
	SET _existencia = _ingreso + _egreso;
	-- * Existe
	SET auxExiste = (SELECT COUNT(*)
	FROM ControlInventario
	WHERE 1=1
		AND producto_id = _producto_id
		AND almacen_id = _almacen_id);
	-- * Control inventario
	IF auxExiste = 0 THEN
		-- * Crear registro
		INSERT INTO ControlInventario
			(producto_id, almacen_id, existencia, ingreso, egreso)
		VALUES
			(_producto_id, _almacen_id, _existencia, _ingreso, _egreso);
	END IF;
	IF auxExiste > 0 THEN
		-- * Obtener Id de tabla control de invetario
		SET id = 0;
		SET id= ( SELECT id
				FROM ControlInventario
				WHERE 1=1
					AND producto_id = _producto_id
					AND almacen_id = _almacen_id);
		-- * Actualizar registro
		UPDATE ControlInventario
		SET
			existencia = _existencia,
			ingreso = _ingreso,
			egreso = _egreso
		WHERE 1=1
			AND id = id;
	END IF;
END &&

-- * -----------------------------------
-- * TRIGGER
-- *------------------------------------
-- * Insert
-- *------------------------------------
DROP TRIGGER IF EXISTS after_inventario_insert &&

CREATE TRIGGER IF NOT EXISTS after_inventario_insert
	AFTER INSERT
	ON Inventario FOR EACH ROW
BEGIN
	-- * Declaración de variables
	DECLARE almacen INT;
	DECLARE producto INT;
	-- * Asignación
	SET almacen = 0;
	SET producto = 0;
	-- * Obtener Datos
	SET almacen = NEW.almacen_id;
	SET producto = NEW.producto_id;
	-- * Procedure
	CALL proc_inventario(almacen, producto);
END &&

-- *------------------------------------
-- * Update
-- *------------------------------------
DROP TRIGGER IF EXISTS after_inventario_update &&

CREATE TRIGGER IF NOT EXISTS after_inventario_update
	AFTER UPDATE
	ON Inventario FOR EACH ROW
BEGIN
	-- * Declaración de variables
	DECLARE almacen INT;
	DECLARE producto INT;
	-- * Asignación
	SET almacen = 0;
	SET producto = 0;
	-- * Obtener Datos
	SET almacen = NEW.almacen_id;
	SET producto = NEW.producto_id;
	-- * Procedure
	CALL proc_inventario(almacen, producto);
END &&

-- *------------------------------------
-- * Delete
-- *------------------------------------
DROP TRIGGER IF EXISTS after_inventario_delete &&

CREATE TRIGGER IF NOT EXISTS after_inventario_delete
	AFTER DELETE
	ON Inventario FOR EACH ROW
BEGIN
	-- * Declaración de variables
	DECLARE almacen INT;
	DECLARE producto INT;
	-- * Asignación
	SET almacen = 0;
	SET producto = 0;
	-- * Obtener Datos
	SET almacen = OLD.almacen_id;
	SET producto = OLD.producto_id;
	-- * Procedure
	CALL proc_inventario(almacen, producto);
END &&


DELIMITER ;











































