const mysql = require('mysql');
const dbConfig = require('./db');
const sqlMap = require('./sqlMap');

const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true    // 多语句查询
});

module.exports = {
  getValue(req, res, next) {
    var username = req.query.username;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getValue;
      connection.query(sql, [username], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  setValue(req, res, next) {
    console.log(req.body);
    var username = req.body.username, password = req.body.password;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.setValue;
      connection.query(sql, [username, password], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
	insertValue(req, res, next){
		var username = req.body.username, password = req.body.password;
		pool.getConnection((err, connection) => {
		  var sql = sqlMap.insertValue;
		  connection.query(sql, [username,password], (err, result) => {
		      res.json(result);
		      connection.release();
		  })
		})
	},
	getCart(req, res, next){
		// var username = req.query.username;
		pool.getConnection((err, connection) => {
		  var sql = sqlMap.getCart;
		  connection.query(sql , (err, result) => {
		      res.json(result);
		      connection.release();
		  })
		})
	},
	insertCart(req, res, next){
		var businessName = req.body.params.businessName, totalMoney = req.body.params.totalMoney , Data = req.body.params.Data;
		pool.getConnection((err, connection) => {
			var sql = sqlMap.insertCart;
			connection.query(sql, [businessName,totalMoney,Data], (err, result) => {
		      res.json(result);
		      connection.release();
		  })
		})
	},
	deleteCart(req, res, next){
		var Data = req.body.params.Data;
		pool.getConnection((err, connection) => {
		  var sql = sqlMap.deleteCart;
		  connection.query(sql, [Data], (err, result) => {
		      res.json(result);
		      connection.release();
		  })
		})
	}
}