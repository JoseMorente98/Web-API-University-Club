var express = require('express');
var membresiaRoute = express.Router();
var membresia = require('../../controller/membresia.controller');
var service = require('../../service');

//GET MEMBRESIAS
membresiaRoute.get('/membresias/', service.verificar, function (req, res, next) {
    usuario = req.usuario.UsuarioID;
    console.log(usuario)
    membresia.selectAll(usuario, function (resultados) {
        if (typeof resultados !== 'undefined') {
            res.json(resultados);
        } else {
            res.json({ "mensaje": "No hay membresias." });
        }
    });
});


//GET MEMBRESIAS
membresiaRoute.get('/membresiasAll/',function (req, res, next) {
    membresia.selectAllMembresias(function (resultados) {
        if (typeof resultados !== 'undefined') {
            res.json(resultados);
        } else {
            res.json({ "mensaje": "No hay membresias." });
        }
    });
});

//GET MEMBRESIA POR USUARIO
membresiaRoute.get('/membresias/:usuarioID',
function (req, res, next) {
    var data = req.params.usuarioID;
    membresia.select(data, function (error, resultado) {
        if (typeof resultado !== 'undefined') {
            res.json(resultado);
        } else {
            res.json({ "Mensaje": "No hay pagos registrados." });
        }
    });
});

//POST MEMBRESIA
membresiaRoute.post('/membresias', function (req, res, next) {
    data = {
        UsuarioID: req.body.UsuarioID,
        Pago: req.body.Pago,
        Mora: req.body.Mora,
        MedioPago: req.body.MedioPago,
        Motivo: req.body.Motivo
    }
    membresia.insert(data, function (resultado) {
        if (typeof resultado !== 'undefined') {
            res.json({
               estado: true,
               mensaje: "Se agregó el cobro de la membresia exitosamente."
            });
            console.log(resultado[0]);
        } else {
            res.json({
                estado: false,
                mensaje: "No se agreg� el cobro de la membresia."
            });
        }
    });
});

//PUT MEMBRESIA
membresiaRoute.put('/membresias/:membresiaID', function (req, res, next) {
    membresiaID = req.params.membresiaID;
    data = {
        Pago: req.body.Pago,
        Mora: req.body.Mora,
        MedioPago: req.body.MedioPago,
        Motivo: req.body.Motivo,
        membresiaID: req.body.MembresiaID
    }
    membresia.update(data, function (resultado) {
        if (typeof resultado !== 'undefined') {
           res.json({
               estado: true,
               mensaje: "Se actualiz� el cobro de la membresia exitosamente."
           });
        } else {
            res.json({
                estado: false,
                mensaje: "No se actualiz� el cobro de la membresia."
            });
        }
    });
});

//DELETE MEMBRESIA
membresiaRoute.delete('/membresias/:membresiaID', function (req, res, next) {
    var data = req.params.membresiaID;
    membresia.delete(data, function (resultado) {
        if (typeof resultado !== 'undefined') {
            res.json({
                estado: true,
                mensaje: "Se elimin� el cobro de la membresia exitosamente."
            });
        } else {
            res.json({ "mensaje": "No se pudo eliminar el cobro de la membresia." });
        }
    });
});

module.exports = membresiaRoute;