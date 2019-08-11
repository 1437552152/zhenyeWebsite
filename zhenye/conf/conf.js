var mysql = require("mysql");
var pool = mysql.createPool({
  host: '47.107.180.202',
  user: 'root',
  password: 'Yyf@123456',
  database: 'zhenye',
  port: 3306,
  multipleStatements: true
});

  function query(sql, values = {}, callback) {
  pool.getConnection(function (err, connection) {
    connection.query(sql, values, function (err, rows) {
      if (err) {
        throw err;
      }
      callback(err, rows);
    });
    connection.release();
  });
}
exports.query = query;
