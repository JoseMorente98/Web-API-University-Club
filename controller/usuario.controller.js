var database = require('../config/database.config');
var usuario = {};

//SELECCIONAR USUARIOS
usuario.selectAll = function(callback) {
  if(database) {
    var query = "CALL SP_MostrarUsuarios();";
    database.query(query, function(error, resultados) {
      if(error) throw error;
      callback(resultados[0]);
    });
  }
}

//SELECCIONAR UN FINANCIERO
usuario.select = function(usuarioID, callback) {
  if(database) {
    var query = "CALL SP_MostrarUsuario(?);";
    database.query(query, usuarioID,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado[0]);
      }
    });
  }
}

//SELECCIONAR UN FINANCIERO
usuario.selectAccount = function(usuarioID, callback) {
  if(database) {
    var query = "CALL SP_MostrarUsuario(?);";
    database.query(query, usuarioID,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        console.log(resultado);
        console.log(resultado[0]);
        callback(resultado);
      }
    });
  }
}

//LOG IN DE USUARIO
usuario.authenticateUser = function(data, callback) {
  if(database) {
    var query = "CALL SP_AutenticarUsuario(?, ?);";
    database.query(query, [data.Correo, data.Contrasena],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        console.log(resultado[0]);
        callback(resultado[0]);
      }
    });
  }
}

//AGREGAR USUARIO
usuario.insert = function(data, callback) {
  if(database) {
    var query = "CALL SP_AgregarUsuario(?, ?, ?, ?, ?, ?);";
    database.query(query,
    [data.Nombre, data.Apellido, data.FechaNacimiento, data.Correo, data.Contrasena, data.TipoUsuarioID],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(resultado[0]);
      }
    });
  }
}

//ACTUALIZAR USUARIO
usuario.update = function(data, callback) {
  if(database) {
    var query = "CALL SP_ActualizarUsuario(?, ?, ?, ?, ?, ?)";
    database.query(query,
    [data.Nombre, data.Apellido, data.FechaNacimiento, data.Correo, data.Contrasena, data.UsuarioID],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(resultado);
      }
    });
  }
}

//ELIMINAR USUARIO
usuario.delete = function(usuarioID, callback) {
  if(database) {
    var query = "CALL SP_EliminarUsuario(?)";
    database.query(query, usuarioID,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });
  }
}

//ACTIVAR O DESACTIVAR USUARIO
usuario.updateActive = function(usuarioID, callback) {
  if(database) {
    var query = "CALL SP_ActualizarEstado(?)";
    database.query(query, usuarioID,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(resultado);
      }
    });
  }
}

module.exports = usuario;