export function getData(params) {
    console.log(params)
  return new Promise((resolve, reject) => db.query(params, (err, respon) => {
    if (err) {
      reject(err);
      throw err;
    } else {
      resolve(respon);
    }
  }));
}