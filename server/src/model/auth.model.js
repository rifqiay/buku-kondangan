const Pool = require("../config/db");

const create = (data) => {
  const { id, nama, email, passwordHash } = data;
  return Pool.query(
    `INSERT INTO users(id, nama, email, password) VALUES('${id}', '${nama}', '${email}', '${passwordHash}')`
  );
};

const findEmail = (email) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT * FROM users WHERE email='${email}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

module.exports = { create, findEmail };
