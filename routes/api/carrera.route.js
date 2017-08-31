var express = require('express');
var carreraRoute = express.Router();
var carrera = require('../../controller/carrera.controller');

//GET CARRERAS
carreraRoute.get('/carreras/', function(req, res, next) {
  carrera.selectAll(function(resultados) {
    if(typeof resultados !== 'undefined') {
      res.json(resultados[0]);
    } else {
      res.json({"mensaje" : "No hay carreras."});
    }
  });
});

//GET CARRERA
carreraRoute.get('/carreras/:carreraID',
  function(req, res, next) {
    var data = req.params.carreraID;
    carrera.select(data, function(error, resultado){
      if(typeof resultado !== 'undefined') {
        res.json(resultado[0]);
      } else {
        res.json({"Mensaje": "No existe la carrera."});
      }
  });
});

//POST CARRERA
carreraRoute.post('/carreras', function(req, res, next) {
  data = req.body.Nombre;
  carrera.insert(data, function(resultado){
  if(typeof resultado !== 'undefined') {
    if(resultado[0]._existe === 0) {
      res.json({
        estado: true,
        mensaje: "Se agregó la carrera exitosamente."
      });
    } else {
      res.json({
        estado: true,
        mensaje: "La carrera ya existe."
      });
    }
      console.log(resultado[0]);
  } else {
      res.json({
	estado: false,
	mensaje: "No se agregó la carrera."
      });
  }
  });
});

//PUT CARRERA
carreraRoute.put('/carreras/:carreraID', function(req, res, next){
  carreraID = req.params.carreraID;
  var data = {
    CarreraID : req.body.CarreraID,
    Nombre : req.body.Nombre
  }
  carrera.update(data, function(resultado){
    if(typeof resultado !== 'undefined') {
      if(resultado[0]._existe === 0) {
        res.json({
          estado: true,
          mensaje: "Se actualizó la carrera exitosamente."
        });
      } else {
        res.json({
          estado: true,
          mensaje: "No puede utilizar ese nombre. ¡Ya Existe!."
        });
      }
    } else {
      res.json({
	estado: false,
	mensaje: "No se actualizó la carrera."
      });
    }
  });
});

//DELETE CARRERA
carreraRoute.delete('/carreras/:carreraID', function(req, res, next){
  var data = req.params.carreraID;
  carrera.delete(data, function(resultado){
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

module.exports = carreraRoute;