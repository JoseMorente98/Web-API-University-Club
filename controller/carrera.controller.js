var database = require('../config/database.config');
var carrera = {};

//SELECCIONAR CARRERAS
carrera.selectAll = function(callback) {
  if(database) {
    query = "CALL SP_MostrarCarreras();";
    database.query(query, function(error, resultados) {
      if(error) throw error;
      callback(resultados);
    });
  }
}

//SELECCIONAR UNA CARRERA
carrera.select = function(carreraID, callback) {
  if(database) {
    var query = "CALL SP_MostrarCarrera(?);";
    database.query(query, carreraID,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado[0]);
      }
    });
  }
}

//AGREGAR CARRERA
carrera.insert = function(data, callback) {
  if(database) {
    var query = "CALL SP_AgregarCarrera(?);";
    database.query(query, data,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(resultado[0]);
      }
    });
  }
}

//ACTUALIZAR CARRERA
carrera.update = function(data, callback) {
  if(database) {
    var query = "CALL SP_ActualizarCarrera(?, ?)";
    database.query(query,
    [data.Nombre, data.CarreraID],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(resultado[0]);
      }
    });
  }
}

//ELIMINAR CARRERA
carrera.delete = function(carreraID, callback) {
  if(database) {
    var query = "CALL SP_EliminarCarrera(?)";
    database.query(query, carreraID,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });
  }
}

module.exports = carrera;