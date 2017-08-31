var database = require('../config/database.config');
var membresia = {};

//SELECCIONAR PAGO MEMBRESIAS
membresia.selectAllMembresias = function(callback) {
  if(database) {
    var query = "CALL SP_MostrarMembresias();";
    database.query(query,
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(resultados[0]);
      }
    });
  }
}

//SELECCIONAR MEMBRESIAS POR USUARIO
membresia.selectAll = function(usuarioID, callback) {
  if(database) {
    var query = "CALL SP_MostrarMembresiaUsuario(?);";
    database.query(query, usuarioID,
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(resultados[0]);
      }
    });
  }
}

//SELECCIONAR MEMBRESIAS POR USUARIO
membresia.select = function(usuarioID, callback) {
  if(database) {
    var query = "CALL SP_MostrarMembresiaUsuario(?);";
    database.query(query, usuarioID,
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(null, resultados[0]);
      }
    });
  }
}

//AGREGAR PAGO MEMBRESIA
membresia.insert = function(data, callback) {
  if(database) {
      var query = "CALL SP_AgregarMembresia(?, ?, ?, ?, ?);";
    database.query(query,
    [data.UsuarioID, data.Pago, data.Mora, data.MedioPago, data.Motivo],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(resultado);
      }
    });
  }
}

//ACTUALIZAR PAGO MEMBRESIA
membresia.update = function(data, callback) {
  if(database) {
    var query = "CALL SP_ActualizarMembresia(?, ?, ?, ?, ?, ?)";
    database.query(query,
    [data.UsuarioID, data.Pago, data.Mora, data.MedioPago, data.Motivo, data.MembresiaID],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(resultado[0]);
      }
    });
  }
}

//ELIMINAR PAGO MEMBRESIA
membresia.delete = function (membresiaID, callback) {
    if (database) {
        var query = "CALL SP_EliminarMembresia(?)";
        database.query(query, membresiaID,
        function (error, resultado) {
            if (error) {
                throw error;
            } else {
                callback(null, resultado);
            }
        });
    }
}


module.exports = membresia;