var express = require('express');
var detalleCarreraRoute = express.Router();
var detalleCarrera = require('../../controller/detalleCarrera.controller');
var service = require('../../service');

//GET DETALLE CARRERAS
detalleCarreraRoute.get('/detalleCarreras/', service.verificar, function (req, res, next) {
    data = req.usuario.UsuarioID
    detalleCarrera.selectCarreras(data, function (resultados) {
        if (typeof resultados !== 'undefined') {
            res.json(resultados);
        } else {
            res.json({ "mensaje": "No hay carreras." });
        }
    });
});

detalleCarreraRoute.get('/detalleCarreras/usuario/:usuarioID', function (req, res, next) {
    console.log(req.params.usuarioID);
    data = req.params.usuarioID
    detalleCarrera.selectCarreras(data, function (resultados) {
        if (typeof resultados !== 'undefined') {
            res.json(resultados);
        } else {
            res.json({ "mensaje": "No hay carreras." });
        }
    });
});

detalleCarreraRoute.get('/detalleCarreras/:carreraID', service.verificar, function (req, res, next) {
    data = {
        UsuarioID: req.usuario.UsuarioID,
        CarreraID: req.params.carreraID
    }
    console.log(data);
    detalleCarrera.selectMiembros(data, function (resultados) {
        if (typeof resultados !== 'undefined') {
            res.json(resultados);
        } else {
            res.json({ "mensaje": "No hay miembros." });
        }
    });
});

//POST DETALLE CARRERA
detalleCarreraRoute.post('/detalleCarreras', function (req, res, next) {
    data = {
        UsuarioID: req.body.UsuarioID,
        CarreraID: req.body.CarreraID,
        FechaGraduacion: req.body.FechaGraduacion
    }
    detalleCarrera.insert(data, function (resultado) {
        if (typeof resultado !== 'undefined') {
            console.log(resultado);
            console.log(resultado[0]);
            if (resultado[0]._existe === 0) {
                res.json({
                    estado: true,
                    mensaje: "Se agregó la carrera al miembro exitosamente."
                });
            } else {
                res.json({
                    estado: true,
                    mensaje: "El miembro ya tiene dicha carrera."
                });
            }
            console.log(resultado[0]);
        } else {
            res.json({
                estado: false,
                mensaje: "No se pudo asignar la carrera al miembro."
            });
        }
    });
});

//DELETE CARRERA
detalleCarreraRoute.delete('/detalleCarreras/:detalleCarreraID', function(req, res, next){
    var data = req.params.detalleCarreraID;
    detalleCarrera.delete(data, function(resultado){
      if(typeof resultado !== 'undefined') {
        res.json({
          estado: true,
          mensaje: "Se eliminó la carrera exitosamente."
        });
      } else {
        res.json({"mensaje":"No se pudo eliminar la carrera."});
      }
    });
  });

module.exports = detalleCarreraRoute;