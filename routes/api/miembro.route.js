var express = require('express');
var miembroRoute = express.Router();
var miembro = require('../../controller/miembro.controller');

//GET MIEMBROS
miembroRoute.get('/miembros/', function(body, res, next) {
    miembro.selectAll(function (resultados) {
    if(typeof resultados !== 'undefined') {
      res.json(resultados);
    } else {
      res.json({"mensaje" : "No hay miembros."});
    }
  });
});

//POST MIEMBRO
miembroRoute.post('/miembros', function(req, res, next) {
  data = {
      Nombre: req.body.Nombre,
      Apellido: req.body.Apellido,
      FechaNacimiento: req.body.FechaNacimiento,
      Nit: req.body.Nit,
      Profesion: req.body.Profesion,
      GradoAcademico: req.body.GradoAcademico,
      CarreraID: req.body.CarreraID,
      FechaGraduacion: req.body.FechaGraduacion,
      Correo: req.body.Correo,
      Contrasena: req.body.Contrasena
  }
  miembro.insert(data, function(resultado){
  if(typeof resultado !== 'undefined') {
    if(resultado[0]._existe === 0) {
      res.json({
        estado: true,
        mensaje: "Se agregó el miembro exitosamente."
      });
    } else {
      res.json({
        estado: true,
        mensaje: "No puede utilizar ese correo. ¡Ya Existe!.."
      });
    }
      console.log(resultado[0]);
  } else {
      res.json({
	estado: false,
	mensaje: "No se agregó el miembro."
      });
  }
  });
});

//PUT MIEMBRO
miembroRoute.put('/miembros/:usuarioID', function(req, res, next){
  usuarioID = req.params.usuarioID;
  data = {
      Nombre: req.body.Nombre,
      Apellido: req.body.Apellido,
      FechaNacimiento: req.body.FechaNacimiento,
      Nit: req.body.Nit,
      Profesion: req.body.Profesion,
      GradoAcademico: req.body.GradoAcademico,
      Correo: req.body.Correo,
      Contrasena: req.body.Contrasena,
      UsuarioID: req.body.UsuarioID
  }
  miembro.update(data, function(resultado){
    if(typeof resultado !== 'undefined') {
      console.log(resultado);
        res.json({
          estado: true,
          mensaje: "Se actualizó el miembro exitosamente."
        });
    } else {
      res.json({
	      estado: false,
	      mensaje: "No se actualizó el miembro."
      });
    }
  });
});

module.exports = miembroRoute;