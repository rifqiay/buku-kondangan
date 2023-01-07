const db = require("../config/db");

const create = (data) => {
  const { id, nama, alamat, jumlah, user_id } = data;
  return db.query(
    `INSERT INTO uang(id,nama, alamat,jumlah,users_id) VALUES('${id}','${nama}','${alamat}',${jumlah},'${user_id}')`
  );
};

const update = (data) => {
  const { id, nama, alamat, jumlah } = data;
  return db.query(
    `UPDATE uang set nama='${nama}', alamat='${alamat}', jumlah=${jumlah} WHERE id='${id}'`
  );
};

const remove = (id) => {
  return db.query(`DELETE FROM uang WHERE id='${id}'`);
};

const getData = ({ user_id, search }) => {
  return db.query(
    `SELECT * FROM uang WHERE nama like '%${search}%' AND users_id='${user_id}'`
  );
};

module.exports = { create, update, remove, getData };
