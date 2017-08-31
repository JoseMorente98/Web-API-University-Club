-- DROP DATABASE UniversityClub;
DROP DATABASE IF EXISTS UniversityClub;
CREATE DATABASE UniversityClub;

USE UniversityClub;

CREATE TABLE TipoUsuarios(
	TipoUsuarioID INT AUTO_INCREMENT NOT NULL,
	nombre VARCHAR(30) NOT NULL,
	PRIMARY KEY(TipoUsuarioID)
);

CREATE TABLE Usuarios(
	UsuarioID INT AUTO_INCREMENT NOT NULL,
	Nombre VARCHAR(50) NOT NULL,
	Apellido VARCHAR(50) NOT NULL,
	FechaNacimiento DATE NOT NULL,
	Nit VARCHAR(10) NOT NULL,
	Profesion VARCHAR(50) NOT NULL,
	GradoAcademico VARCHAR(50) NOT NULL,
	Correo VARCHAR(50) NOT NULL,
	Contrasena VARCHAR(25) NOT NULL,
	FechaRegistro DATE NOT NULL,
	Activo TINYINT NOT NULL,
	TipoUsuarioID INT NOT NULL,
	PRIMARY KEY(UsuarioID),
	FOREIGN KEY(TipoUsuarioID) REFERENCES TipoUsuarios(TipoUsuarioID)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

CREATE TABLE Carreras(
	CarreraID INT AUTO_INCREMENT NOT NULL,
	Nombre VARCHAR(50) NOT NULL,
	PRIMARY KEY(CarreraID)
);

CREATE TABLE DetalleCarreras(
	DetalleCarreraID INT AUTO_INCREMENT NOT NULL,
	CarreraID INT NOT NULL,
	UsuarioID INT NOT NULL,
	FechaGraduacion DATE NOT NULL,
	PRIMARY KEY(DetalleCarreraID),
	FOREIGN KEY(CarreraID) REFERENCES Carreras(CarreraID)
	ON UPDATE CASCADE
	ON DELETE CASCADE,
	FOREIGN KEY(UsuarioID) REFERENCES Usuarios(UsuarioID)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

CREATE TABLE Membresias(
	MembresiaID INT AUTO_INCREMENT NOT NULL,
	UsuarioID INT NOT NULL,
	FechaHora DATETIME NOT NULL,
	Pago DECIMAL NOT NULL,
	Mora DECIMAL NOT NULL,
	MedioPago VARCHAR(30) NOT NULL,
	Motivo VARCHAR(50) NOT NULL,
	Total Decimal NOT NULL,
	PRIMARY KEY(MembresiaID),
	FOREIGN KEY(UsuarioID) REFERENCES Usuarios(UsuarioID)
	ON UPDATE CASCADE
	ON DELETE CASCADE	
);

CREATE TABLE Correos(
	CorreoID INT AUTO_INCREMENT NOT NULL,
	Destinatario VARCHAR(255) NOT NULL,
	Asunto VARCHAR(100) NOT NULL,
	Mensaje TEXT NOT NULL,
	PRIMARY KEY(CorreoID)
);

-- SP AGREGAR USUARIO
DELIMITER $$
CREATE PROCEDURE SP_AgregarUsuario
(IN _nombre VARCHAR(50), _apellido VARCHAR(50), _fechaNacimiento DATE, _correo VARCHAR(50), _contrasena VARCHAR(25), _tipoUsuarioID INT)
BEGIN
	DECLARE _existe INT;
	SET _existe = (SELECT COUNT(*) FROM Usuarios WHERE Correo = _correo);
	IF(_existe = 0) THEN
	INSERT INTO Usuarios(Nombre, Apellido, FechaNacimiento, Nit, Profesion, 
		GradoAcademico, Correo, Contrasena, FechaRegistro, Activo, TipoUsuarioID) 
			VALUES(_nombre, _apellido, _fechaNacimiento, "C/F", "N/A", "N/A", _correo, _contrasena, NOW(), 1, _tipoUsuarioID);
		SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$

-- SP AGREGAR CARRERAS
DELIMITER $$
CREATE PROCEDURE SP_AgregarCarrera
(IN _nombre VARCHAR(50))
BEGIN
	DECLARE _existe INT;
	SET _existe = (SELECT COUNT(*) FROM Carreras WHERE Nombre = _nombre);

	IF (_existe = 0) THEN
		INSERT INTO Carreras(Nombre) 
			VALUES(_nombre);		
		SELECT _existe;
	ELSE 
		SELECT _existe;
	END IF;
END;
$$

-- SP AGREGAR DETALLE CARRERA
DELIMITER $$
CREATE PROCEDURE SP_AgregarDetalleCarrera
(IN _usuarioID INT, _carreraID INT, _fechaGraduacion DATE)
BEGIN
	DECLARE _existe INT;
	SET _existe = (SELECT COUNT(*) FROM DetalleCarreras WHERE UsuarioID = _usuarioID AND CarreraID = _carreraID);

	IF (_existe = 0) THEN
		INSERT INTO DetalleCarreras(UsuarioID, CarreraID, FechaGraduacion) 
			VALUES(_usuarioID, _carreraID, _fechaGraduacion);
		SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$


-- SP AGREGAR MIEMBRO
DELIMITER $$
CREATE PROCEDURE SP_AgregarMiembro
(IN _nombre VARCHAR(50), _apellido VARCHAR(50), _fechaNacimiento DATE, _nit VARCHAR(10), _profesion VARCHAR(50),
	_gradoAcademico VARCHAR(50), _carreraID INT, _fechaGraduacion DATE, _correo VARCHAR(50), _contrasena VARCHAR(25))
BEGIN
	DECLARE _usuarioID INT;
	DECLARE _existe INT;
	SET _existe = (SELECT COUNT(*) FROM Usuarios WHERE Correo = _correo);
	
	IF(_existe = 0) THEN
	INSERT INTO Usuarios(Nombre, Apellido, FechaNacimiento, Nit, Profesion, 
		GradoAcademico, Correo, Contrasena, FechaRegistro, Activo, TipoUsuarioID) 
			VALUES(_nombre, _apellido, _fechaNacimiento, _nit, _profesion, 
				_gradoAcademico, _correo, _contrasena, NOW(), 0, 3);
		SET _usuarioID = LAST_INSERT_ID();
		CALL SP_AgregarDetalleCarrera(_usuarioID, _carreraID, _fechaGraduacion);
		SELECT _existe;
	ELSE 
		SELECT _existe;
	END IF;
END;
$$

-- SP AGREGAR MEMBRESIAS
DELIMITER $$
CREATE PROCEDURE SP_AgregarMembresia
(IN _usuarioID INT, _pago DECIMAL, _mora DECIMAL, _medioPago VARCHAR(30), _motivo VARCHAR(50))
BEGIN
	DECLARE _total DECIMAL;
	SET _total = (_pago + _mora);
	INSERT INTO Membresias(UsuarioID, FechaHora, Pago, Mora, MedioPago, Motivo, Total)
		VALUES(_usuarioID, NOW(), _pago, _mora, _medioPago, _motivo, _total);
END;
$$

-- SP AGREGAR CORREO
DELIMITER $$
CREATE PROCEDURE SP_AgregarCorreo
(IN _destinatario VARCHAR(255), _asunto VARCHAR(100), _mensaje TEXT)
BEGIN
	INSERT INTO Correos(Destinatario, Asunto, Mensaje)
		VALUES(_destinatario, _asunto, _mensaje);
END;
$$

--SP ACTUALIZAR MIEMBRO
DELIMITER $$
CREATE PROCEDURE SP_ActualizarMiembro
(IN _nombre VARCHAR(50), _apellido VARCHAR(50), _fechaNacimiento DATE, _nit VARCHAR(10), _profesion VARCHAR(50),
	_gradoAcademico VARCHAR(50), _correo VARCHAR(50), _contrasena VARCHAR(25), _usuarioID INT)
BEGIN
	UPDATE Usuarios SET Nombre = _nombre, Apellido = _apellido, Nit = _nit,
		Profesion = _profesion, GradoAcademico = _gradoAcademico,
		Correo = _correo, Contrasena = _contrasena WHERE UsuarioID = _usuarioID;
END;
$$

-- SP ACTUALIZAR ESTADO
DELIMITER $$
CREATE PROCEDURE SP_ActualizarEstado
(_usuarioID INT)
BEGIN
	DECLARE _activo INT;
	 SET _activo = (SELECT Activo FROM Usuarios WHERE UsuarioID = _usuarioID);
	IF(_activo = 0) THEN
		UPDATE Usuarios SET Activo = 1 WHERE UsuarioID = _usuarioID;
	ELSE
		UPDATE Usuarios SET Activo = 0 WHERE UsuarioID = _usuarioID;
	END IF;
END;
$$

-- SP ACTUALIZAR USUARIO
DELIMITER $$
CREATE PROCEDURE SP_ActualizarUsuario
(IN _nombre VARCHAR(50), _apellido VARCHAR(50), _fechaNacimiento DATE, _correo VARCHAR(50), _contrasena VARCHAR(25), _usuarioID INT)
BEGIN	
	UPDATE Usuarios SET Nombre = _nombre, Apellido = _apellido,
		Correo = _correo, Contrasena = _contrasena WHERE UsuarioID = _usuarioID;
END;
$$

--SP ACTUALIZAR CARRERA
DELIMITER $$
CREATE PROCEDURE SP_ActualizarCarrera
(IN _nombre VARCHAR(50), _carreraID INT)
BEGIN
	DECLARE _existe INT;
	SET _existe = (SELECT COUNT(*) FROM Carreras WHERE Nombre = _nombre);
	
	IF(_existe = 0) THEN
	UPDATE Carreras SET Nombre = _nombre WHERE CarreraID = _carreraID;
		SELECT _existe;
	ELSE 
		SELECT _existe;
	END IF;
END;
$$

--SP ACTUALIZAR MEMBRESIA
DELIMITER $$
CREATE PROCEDURE SP_ActualizarMembresia
(IN _pago DECIMAL, _mora DECIMAL, _medioPago VARCHAR(30), _motivo VARCHAR(50), _membresiaID INT)
BEGIN
	DECLARE _total DECIMAL;
	SET _total = (_pago + _mora);
	UPDATE Membresias SET Pago = _pago, Mora = _mora, MedioPago = _medioPago, 
		Motivo = _motivo, Total = _total WHERE MembresiaID = _membresiaID;
END;
$$

-- SP ELIMINAR USUARIOS
DELIMITER $$
CREATE PROCEDURE SP_EliminarUsuario
(IN _usuarioID INT)
BEGIN
	DELETE FROM Usuarios WHERE UsuarioID = _usuarioID;
END;
$$

-- SP ELIMINAR CARRERAS
DELIMITER $$
CREATE PROCEDURE SP_EliminarDetalleCarrera
(IN _detalleCarreraID INT)
BEGIN
	DELETE FROM DetalleCarreras WHERE DetalleCarreraID = _detalleCarreraID;
END;
$$

DELIMITER $$
CREATE PROCEDURE SP_EliminarCarrera
(IN _carreraID INT)
BEGIN
	DECLARE _confirmar INT;	
	IF (_carreraID != 1) THEN
		UPDATE DetalleCarreras SET CarreraID = 1 WHERE CarreraID = _carreraID;
		DELETE FROM Carreras WHERE CarreraID = _carreraID;
		SET _confirmar = 1;
		SELECT _confirmar;
	ELSE
		SET _confirmar = 0;
		SELECT _confirmar;
	END IF;	
END;
$$

--SP ELIMINAR MEMBRESIAS
DELIMITER $$
CREATE PROCEDURE SP_EliminarMembresia
(IN _membresiaID INT)
BEGIN
	DELETE FROM Membresias WHERE MembresiaID = _membresiaID;
END;
$$

--SP ELIMINAR CORREOS
DELIMITER $$
CREATE PROCEDURE SP_EliminarCorreo
(IN _correoID INT)
BEGIN
	DELETE FROM Correos WHERE CorreoID = _correoID;
END;
$$

-- SP MOSTRAR USUARIOS
DELIMITER $$
CREATE PROCEDURE SP_MostrarUsuarios()
BEGIN
	SELECT * FROM Usuarios;
END;
$$

-- SP MOSTRAR CARRERAS
DELIMITER $$
CREATE PROCEDURE SP_MostrarCarreras()
BEGIN
	SELECT * FROM Carreras WHERE CarreraID > 1;
END;
$$

-- SP MOSTRAR CARRERAS
DELIMITER $$
CREATE PROCEDURE SP_MostrarDetalleCarreras()
BEGIN
	SELECT * FROM DetalleCarreras;
END;
$$

-- SP MOSTRAR MEMBRESIAS
DELIMITER $$
CREATE PROCEDURE SP_MostrarMembresias()
BEGIN
	SELECT Usuarios.UsuarioID, Usuarios.Nombre AS 'Nombre', Usuarios.Apellido AS 'Apellido',
		DATE_FORMAT(FechaHora, "%Y-%m-%d") AS 'FechaHora', DATE_FORMAT(FechaHora, "%m") AS 'Mes', Pago, Mora, 
			MedioPago, Motivo, Total FROM Membresias
	INNER JOIN Usuarios ON (Membresias.UsuarioID = Usuarios.UsuarioID);
END;
$$

-- SP MOSTRAR CORREOS
DELIMITER $$
CREATE PROCEDURE SP_MostrarCorreos()
BEGIN
	SELECT * FROM Correos;
END;
$$

-- SP MOSTRAR UN USUARIO
DELIMITER $$
CREATE PROCEDURE SP_MostrarUsuario
(IN _usuarioID INT)
BEGIN
	SELECT UsuarioID, Nombre, Apellido, 
	DATE_FORMAT(FechaNacimiento, "%Y-%m-%d") AS 'FechaNacimiento', 
		Nit, Profesion, GradoAcademico, Correo, Contrasena 
			FROM Usuarios WHERE UsuarioID = _usuarioID;
END;
$$

-- SP MOSTRAR UNA CARRERA
DELIMITER $$
CREATE PROCEDURE SP_MostrarCarrera
(IN _carreraID INT)
BEGIN
	SELECT * FROM Carreras WHERE CarreraID = _carreraID;
END;
$$

-- SP MOSTRAR UNA CORREO
DELIMITER $$
CREATE PROCEDURE SP_MostrarCorreo
(IN _correoID INT)
BEGIN
	SELECT * FROM Correos WHERE CorreoID = _correoID;
END;
$$

-- SP MOSTRAR UNA MEMBRESIA 
DELIMITER $$
CREATE PROCEDURE SP_MostrarMembresia
(IN _membresiaID INT)
BEGIN
	SELECT * FROM Membresias WHERE MembresiaID = _membresiaID;
END;
$$

-- SP MOSTRAR MEMBRESIA POR USUARIO
DELIMITER $$
CREATE PROCEDURE SP_MostrarMembresiaUsuario
(IN _usuarioID INT)
BEGIN
	SELECT MembresiaID, UsuarioID, DATE_FORMAT(FechaHora, "%Y/%m/%d  %H:%m:%s") AS 'FechaHora',
		DATE_FORMAT(FechaHora, "%M") AS 'Mes', DATE_FORMAT(FechaHora, "%c") AS 'MesPago', Pago, Mora, MedioPago, 
			Motivo, Total FROM Membresias WHERE UsuarioID = _usuarioID
			ORDER BY DATE_FORMAT(FechaHora, "%M");
END;
$$

-- SP MOSTRAR CARRERAS POR USUARIO
DELIMITER $$
CREATE PROCEDURE SP_MostrarCarrerasMiembro
(IN _usuarioID INT)
BEGIN
	SELECT DetalleCarreraID, Carreras.CarreraID, Carreras.Nombre, Usuarios.UsuarioID, Usuarios.Nombre AS 'NombreUsuario', Usuarios.Apellido, 
		DATE_FORMAT(FechaGraduacion, "%d de %M del %Y") AS 'FechaGraduacion'
			FROM DetalleCarreras
			INNER JOIN Carreras ON (DetalleCarreras.CarreraID = Carreras.CarreraID)
			INNER JOIN Usuarios ON (DetalleCarreras.UsuarioID = Usuarios.UsuarioID)
			WHERE Usuarios.UsuarioID = _usuarioID;
END;
$$

-- SP MOSTRAR MIEMBROS POR CARRERA
DELIMITER $$
CREATE PROCEDURE SP_MostrarMiembrosCarrera
(IN _usuarioID INT, _carreraID INT)
BEGIN
	DECLARE _fechaGraduacion DATE;
	SET _fechaGraduacion = (SELECT FechaGraduacion FROM DetalleCarreras WHERE UsuarioID = _usuarioID);
	SELECT Usuarios.Nombre, Usuarios.Apellido, DATE_FORMAT(Usuarios.FechaNacimiento, "%d/%m/%Y") AS 'FechaNacimiento', 
	Usuarios.Profesion, Usuarios.Correo, CarreraID, DATE_FORMAT(FechaGraduacion, "%Y") AS 'FechaGraduacion' FROM DetalleCarreras
		INNER JOIN Usuarios ON (DetalleCarreras.UsuarioID = Usuarios.UsuarioID)
			WHERE CarreraID = _carreraID AND DATE_FORMAT(FechaGraduacion, "%Y") = DATE_FORMAT(_fechaGraduacion, '%Y');
END;
$$

-- SP LOG IN
DELIMITER $$
CREATE PROCEDURE SP_AutenticarUsuario
(IN _correo VARCHAR(50), _contrasena VARCHAR(25))
BEGIN
	SELECT * FROM Usuarios WHERE Correo = _correo AND Contrasena = _contrasena;
END;
$$

-- INSERT
INSERT INTO TipoUsuarios(Nombre) VALUES('Administrador');
INSERT INTO TipoUsuarios(Nombre) VALUES('Financiero');
INSERT INTO TipoUsuarios(Nombre) VALUES('Miembro');