var express = require('express');
var jwt = require('jsonwebtoken');
var usuario = require('../controller/usuario.controller');
var authRoute = express.Router();

//AUTENTICAR USUARIO
authRoute.post('/auth/', function(req, res) {
	var data = {
		Correo: req.body.Correo,
		Contrasena: req.body.Contrasena
	}
	usuario.authenticateUser(data, function(resultado) {
		if(typeof resultado[0] !== "undefined") {
			console.log(resultado[0]);
			var token = 'Bearer ' + jwt.sign(resultado[0], 'asdfghjkl', { expiresIn: '1h' });
			resultado[0].estado = true;
			resultado[0].mensaje = "Bienvenido a University Club";
			resultado[0].token = token;
			console.log(resultado[0]);
			res.json(resultado[0]);
		} else {
			res.json({
				estado: false,
				mensaje: "Ingrese su usuario o contraseña correctamente."
			});
		}
	});
});
module.exports = authRoute;