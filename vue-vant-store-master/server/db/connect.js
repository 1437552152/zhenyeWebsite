var mysql = require("mysql");
var pool = mysql.createPool({
  host: '47.107.180.202',
  user: 'root',
  password: 'Yyf@123456',
  database: 'vantstore',
  port: 3306,
  multipleStatements: true
});

  function query(sql, values = {}, callback) {
  pool.getConnection(function (err, connection) {
    if(err){
      callback(err);
    }
    connection.query(sql, values, function (err, rows) {
      if (err) {
        callback(err);
      }else
      callback(err, rows);
    });
    connection.release();
  });
}
exports.query = query;
