var database = require('../config/database.config');
var correo = {};

//SELECCIONAR CORREOS
correo.selectAll = function(callback) {
  if(database) {
    query = "CALL SP_MostrarCorreos();";
    database.query(query, function(error, resultados) {
      if(error) throw error;
      callback(resultados);
    });
  }
}

//SELECCIONAR CORREO
correo.select = function(correoID, callback) {
  if(database) {
    var query = "CALL SP_MostrarCorreo(?);";
    database.query(query, correoID,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado[0]);
      }
    });
  }
}

//AGREGAR CORREO
correo.insert = function(data, callback) {
  if(database) {
    var query = "CALL SP_AgregarCorreo(?, ?, ?);";
    database.query(query, 
    [data.to, data.subject, data.text],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado[0]);
      }
    });
  }
}


//ELIMINAR CARRERA
correo.delete = function(correoID, callback) {
  if(database) {
    var query = "CALL SP_EliminarCorreo(?)";
    database.query(query, correoID,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });
  }
}

module.exports = correo;