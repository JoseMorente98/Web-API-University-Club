var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

//IMPORTAR RUTAS
var carreraRoute = require('./routes/api/carrera.route');
var detalleCarreraRoute = require('./routes/api/detalleCarrera.route');
var membresiaRoute = require('./routes/api/membresia.route');
var miembroRoute = require('./routes/api/miembro.route');
var usuarioRoute = require('./routes/api/usuario.route');
var auth = require('./routes/auth.route');
var nodemailer = require('./routes/api/mailCtrl.route')

var app = express();
var port = 3000;
var uri = '/api/';

//CONFIGURACION VISTA
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//CONFIGURACION LOGGER
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'apidoc')));

//CONFIGURACION DE BODY-PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');  
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
	if(req.methods == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

//RUTEAR API
app.use("/", auth)
app.use(uri, nodemailer)
app.use(uri, usuarioRoute);
app.use(uri, carreraRoute);
app.use(uri, detalleCarreraRoute);
app.use(uri, miembroRoute);
app.use(uri, membresiaRoute);



app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ERROR HANDLER
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');

  next();
});

app.listen(port, function() {
  console.log("El Servidor Corre En El Puerto: " + port + " :D");
});