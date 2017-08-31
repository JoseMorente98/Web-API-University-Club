var mysql = require('mysql');
//PARAMETROS DE LA CONEXION MYSQL
var parametros =  {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'UniversityClub'
}
var connection = mysql.createConnection(parametros);

module.exports = connection;