var express = require('express');
var carreraRoute = express.Router();
var carrera = require('../../controller/carrera.controller');

/**
 * @api {get} /carreras/ GET Carrera. 
 * @apiName GetCarrera
 * @apiGroup Carreras
 *
 * 
 *
 * @apiSuccess {Integer} CarreraID ID de la carrera.
 * @apiSuccess {String} Nombre  Nombre de la carrera.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "CarreraID": 1,
 *       "Nombre": "Ingenieria en Sistemas"
 *     }
 *
 * @apiError CarreraNoEncontrada No hay Carreras.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No hay carreras"
 *     }
 */

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

/**
 * @api {get} /carreras/:carreraID GET Carrera. 
 * @apiName GetCarrera
 * @apiGroup Carreras
 *
 * 
 *
 * @apiSuccess {Integer} CarreraID ID de la carrera.
 * @apiSuccess {String} Nombre  Nombre de la carrera.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "CarreraID": 1,
 *       "Nombre": "Ingenieria en Sistemas"
 *     }
 *
 * @apiError CarreraNoEncontrada No hay Carreras.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No se encontró la carrera."
 *     }
 */

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

/**
 * @api {post} /carreras/ POST Carrera.
 * @apiName PostCarrera
 * @apiGroup Carreras
 *
 * @apiParam {String} Nombre Nombre de la carrera.
 *
 * @apiSuccess {Integer} CarreraID Id de la carrera.
 * @apiSuccess {String} Nombre  Nombre de la carrera.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "CarreraID": 1,
 *       "Nombre": "Ingenieria en Sistemas"
 *     }
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No se pudo ingresar la carrera."
 *     }
 */

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

/**
 * @api {put} /carreras/ PUT Categoría.
 * @apiName PutCarrera
 * @apiGroup Carreras
 *
 * @apiParam {String} CarreraID ID de la carrera.
 * @apiParam {String} Nombre de la carrera.
 *
 * @apiSuccess {String} Nombre Actualiza Nombre de la carrera.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "CarreraID": 1,
 *       "Nombre": "Ingenieria en Sistemas"
 *     }
 *
 * @apiError CarreraNoEncontrada No hay carreras.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No se actualizó la carrera."
 *     }
 */

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

/**
 * @api {Delete} /carreras/:carreraID DELETE Carrera.
 * @apiName DeleteCarrera
 * @apiGroup Carreras
 *
 *
 * @apiSuccess {Integer} CarreraID ID de la carrera.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "CarreraID": 1
 *     }
 *
 * @apiError CarreraNoEncontrada No hay carreras.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No se pudo eliminar la carrera."
 *     }
 */

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