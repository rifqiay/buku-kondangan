const db = require("../config/db");

const edit = (data) => {
  const { nama, nomortelepon, kota, id } = data;
  return db.query(
    `UPDATE users SET nama='${nama}', nomortelepon='${nomortelepon}', kota='${kota}' WHERE id='${id}' returning *`
  );
};

const editPhoto = (id, photo) => {
  return db.query(`UPDATE users SET photo='${photo}' WHERE id='${id}'`);
};

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE id='${id}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

module.exports = { edit, editPhoto, getUser };
