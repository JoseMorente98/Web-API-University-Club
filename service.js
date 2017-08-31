var jwt = require('jsonwebtoken');
var service = {};

//VERIFICAR EL TOKEN
service.verificar = function(req, res, next) {
	console.log("Funcion para verificar el token");
	var header = req.headers.authorization;
    if (typeof header !== 'undefined') {
        var headerArray = header.split(" ");
        var token = headerArray[1];
        if(token) {
        	console.log("Si existe el token");
        	jwt.verify(token, 'asdfghjkl', function(err, decoded){
			if(err) {
				return res.json({
					success: false,
					mensaje: 'Autenticacion Fallida, Expiró el Token D:',
					error: err
				});
			} else {
				console.log("Token Decodificado :D");
				req.token = token;
				estado = true;
				req.usuario = decoded;
				console.log(req.usuario);
				next();
			}
		});
        } else {
        	console.log("No existe el Token");
        	res.json({
	        	estado: false,
	        	mensaje: "No Existe el Token D:"
	        });
        }
    } else {
        console.log("No Lleva la Cabecera Authorization");
        res.json({
        	estado: false,
        	mensaje: "No Lleva la Cabecera de Autorizacion"
        });
    }
}

module.exports = service;