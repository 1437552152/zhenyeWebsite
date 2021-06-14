var sqlMap = {
  getValue: 'SELECT * FROM user WHERE username = ?',
  setValue: 'UPDATE user SET password = ? WHERE username = ?',
	insertValue: 'insert into user (username,password) value(?,?)',
	insertCart: 'insert into cart (businessName,totalMoney,Data) value(?,?,?)',
	getCart:'SELECT * FROM cart',
	deleteCart:'delete from cart where Data = ?'
}

module.exports = sqlMap;