var mysql = require('mysql');
var connection = mysql.createConnection({
  host: '47.107.180.202',
  user: 'root',
  password: 'Yyf@123456',
  database: 'vantstore',
  port: 3306,
  multipleStatements: true
});

connection.connect();

module.exports = connection;
