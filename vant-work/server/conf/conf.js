/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-20 00:29:24
 * @LastEditors  : yfye
 * @LastEditTime : 2021-03-29 13:48:42
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
var mysql = require("mysql");
var pool = mysql.createPool({
    host: '139.224.217.178',
    user: 'root',
    password: 'root_password',
    database: 'News',
    port: 3306,
    multipleStatements: true
});

function query(sql, values = {}, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(err);
        }
        connection.query(sql, values, function(err, rows) {
            if (err) {
                callback(err);
            } else
                callback(err, rows);
        });
        connection.release();
    });
}
exports.query = query;