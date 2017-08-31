var database = require('../config/database.config');
var miembro = {};

//SELECCIONAR MIEMBROS ACTIVOS
miembro.selectAll = function(callback) {
  if(database) {
      query = "CALL SP_MostrarUsuarios();";
    database.query(query, function(error, resultados) {
      if(error) throw error;
      callback(resultados);
    });
  }
}

//AGREGAR MIEMBRO
miembro.insert = function(data, callback) {
  if(database) {
    var query = "CALL SP_AgregarMiembro(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    database.query(query,
    [data.Nombre, data.Apellido, data.FechaNacimiento, data.Nit, 
    data.Profesion, data.GradoAcademico, data.CarreraID, data.FechaGraduacion, 
    data.Correo, data.Contrasena],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(resultado[0]);
      }
    });
  }
}

//ACTUALIZAR MIEMBRO
miembro.update = function(data, callback) {
  if(database) {
    var query = "CALL SP_ActualizarMiembro(?, ?, ?, ?, ?, ?, ?, ?, ?)";
    database.query(query,
    [data.Nombre, data.Apellido, data.FechaNacimiento, data.Nit, 
    data.Profesion, data.GradoAcademico, data.Correo, data.Contrasena, data.UsuarioID],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(resultado);
      }
    });
  }
}

module.exports = miembro;