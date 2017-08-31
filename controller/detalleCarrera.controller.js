var database = require('../config/database.config');
var detalleCarrera = {};

//SELECCIONAR DETALLE DE CARRERAS
detalleCarrera.selectAll = function(callback) {
  if(database) {
    query = "CALL SP_MostrarDetalleCarreras();";
    database.query(query, function(error, resultados) {
      if(error) throw error;
      callback(resultados);
    });
  }
}

//SELECCIONAR CARRERAS POR USUARIO
detalleCarrera.selectCarreras = function(data, callback) {
  if(database) {
    var query = "CALL SP_MostrarCarrerasMiembro(?);";
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

//SELECCIONAR CARRERAS POR USUARIO
detalleCarrera.selectMiembros = function(data, callback) {
  if(database) {
    var query = "CALL SP_MostrarMiembrosCarrera(?, ?);";
    database.query(query, [data.UsuarioID, data.CarreraID],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(resultado[0]);
      }
    });
  }
}

//AGREGAR DETALLE DE CARRERAS
detalleCarrera.insert = function(data, callback) {
  if(database) {
    var query = "CALL SP_AgregarDetalleCarrera(?, ?, ?);";
    database.query(query, 
    [data.UsuarioID, data.CarreraID, data.FechaGraduacion],
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
detalleCarrera.delete = function(detalleCarreraID, callback) {
  if(database) {
    var query = "CALL SP_EliminarDetalleCarrera(?)";
    database.query(query, detalleCarreraID,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });
  }
}

module.exports = detalleCarrera;