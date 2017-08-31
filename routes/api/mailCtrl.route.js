var express = require('express');
var nodemailer = require('nodemailer');
var correoRoute = express.Router();
var correo = require('../../controller/correo.controller');

correoRoute.post('/correosSend', function(req, res, next) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'josemorenteg98@gmail.com',
            pass: 'MorenteG2017'
        }
    });

    var mailOptions = {
        from: 'admin@gmail.com',
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    };

    correo.insert(mailOptions, function(resultado){
        if(typeof resultado !== 'undefined') {
            res.json({
                estado: true,
                mensaje: "Se ha enviado el correo."
            });
            console.log(resultado);
        } else {
            console.log(resultado);
            res.json({
                estado: false,
                mensaje: "No se pudo enviar el correo."
            });
        }
    });
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
            res.send(500, err.message);
        } else {
            console.log("Correo Enviado :D");
            res.status(200).jsonp(req.body);
        }
    });
});


//GET CORREOS
correoRoute.get('/correos/', function(req, res, next) {
  correo.selectAll(function(resultados) {
    if(typeof resultados !== 'undefined') {
      res.json(resultados[0]);
    } else {
      res.json({"mensaje" : "No hay correos."});
    }
  });
});

//GET CORREO
correoRoute.get('/correos/:correoID',
  function(req, res, next) {
    var data = req.params.correoID;
    correo.select(data, function(error, resultado){
      if(typeof resultado !== 'undefined') {
        res.json(resultado[0]);
      } else {
        res.json({"Mensaje": "No existe el correo."});
      }
  });
});

//DELETE CORREO
correoRoute.delete('/correos/:correoID', function(req, res, next){
    var data = req.params.correoID;
    correo.delete(data, function(resultado){
      if(typeof resultado !== 'undefined') {
        res.json({
          estado: true,
          mensaje: "Se eliminó el correo exitosamente."
        });
      } else {
        res.json({"mensaje":"No se pudo eliminar el correo."});
      }
    });
  });

module.exports = correoRoute;