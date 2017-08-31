var express = require('express');
var usuarioRoute = express.Router();
var usuario = require('../../controller/usuario.controller');
var service = require('../../service');

//GET USUARIOS
usuarioRoute.get('/usuarios/', function (req, res, next) {
    usuario.selectAll(function (resultados) {
        if (typeof resultados !== 'undefined') {
            res.json(resultados);
        } else {
            res.json({ "mensaje": "No hay usuarios." });
        }
    });
});

//GET USUARIO
usuarioRoute.get('/usuarios/:usuarioID',
  function (req, res, next) {
      var data = req.params.usuarioID;
      usuario.select(data, function (error, resultado) {
          if (typeof resultado !== 'undefined') {
              res.json(resultado[0]);
          } else {
              res.json({ "Mensaje": "No existe el usuario." });
          }
      });
});

//GET ACCOUNT
usuarioRoute.get('/usuariosAccount/', service.verificar, function (req, res, next) {
    data = req.usuario.UsuarioID
    console.log(data);
    usuario.selectAccount(data, function (resultados) {
        if (typeof resultados !== 'undefined') {
            res.json(resultados[0]);
        } else {
            res.json({ "mensaje": "No existe usuario." });
        }
    });
});

//POST USUARIO
usuarioRoute.post('/usuarios', function (req, res, next) {
    data = {
        Nombre: req.body.Nombre,
        Apellido: req.body.Apellido,
        FechaNacimiento: req.body.FechaNacimiento,
        Correo: req.body.Correo,
        Contrasena: req.body.Contrasena,
        TipoUsuarioID: req.body.TipoUsuarioID
    }
    usuario.insert(data, function (resultado) {
        if (typeof resultado !== 'undefined') {
            if (resultado[0]._existe === 0) {
                res.json({
                    estado: true,
                    mensaje: "Se agregó el usuario exitosamente."
                });
            } else {
                res.json({
                    estado: true,
                    mensaje: "No puede utilizar ese correo. ¡Ya Existe!."
                });
            }
            console.log(resultado[0]);
        } else {
            res.json({
                estado: false,
                mensaje: "No se agregó el usuario."
            });
        }
    });
});

//PUT USUARIO
usuarioRoute.put('/usuarios/:usuarioID', function (req, res, next) {
    usuarioID = req.params.usuarioID;
    data = {
        Nombre: req.body.Nombre,
        Apellido: req.body.Apellido,
        FechaNacimiento: req.body.FechaNacimiento,
        Correo: req.body.Correo,
        Contrasena: req.body.Contrasena,
        UsuarioID: usuarioID
    }
    usuario.update(data, function (resultado) {
        if (typeof resultado !== 'undefined') {
            res.json({
                estado: true,
                mensaje: "Se actualizó el usuario exitosamente."
            });
        } else {
            res.json({
                estado: false,
                mensaje: "No se actualizó el usuario."
            });
        }
    });
});

//DELETE USUARIO
usuarioRoute.delete('/usuarios/:usuarioID', function (req, res, next) {
    var data = req.params.usuarioID;
    usuario.delete(data, function (resultado) {
        if (typeof resultado !== 'undefined') {
            res.json({
                estado: true,
                mensaje: "Se eliminó el usuario exitosamente."
            });
        } else {
            res.json({ "mensaje": "No se pudo eliminar el usuario." });
        }
    });
});

//PUT USUARIO
usuarioRoute.put('/usuarios/active/:usuarioID', function (req, res, next) {
    console.log(req.params.usuarioID);
    var data = req.params.usuarioID;
    usuario.updateActive(data, function (resultado) {
        if (typeof resultado !== 'undefined') {
            console.log(resultado);
            res.json({
                estado: true,
                mensaje: "Ha cambiado de estado."
            });
        } else {
            res.json({ "mensaje": "No se pudo cambiar de estado." });
        }
    });
});

module.exports = usuarioRoute;