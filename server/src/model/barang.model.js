const db = require("../config/db");

const create = (data) => {
  const { id, nama, alamat, barang, user_id } = data;
  return db.query(
    `INSERT INTO barang(id,nama, alamat,barang,users_id) VALUES('${id}','${nama}','${alamat}','${barang}','${user_id}')`
  );
};

const update = (data) => {
  const { id, nama, alamat, barang } = data;
  return db.query(
    `UPDATE barang set nama='${nama}', alamat='${alamat}', barang='${barang}' WHERE id='${id}' RETURNING *`
  );
};

const remove = (id) => {
  return db.query(`DELETE FROM barang WHERE id='${id}'`);
};

const getData = ({ user_id, search, sortby, sort, limit, offset }) => {
  return db.query(
    `SELECT * FROM barang WHERE nama ilike '%${search}%' AND users_id='${user_id}' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

const countData = () => {
  return db.query("SELECT COUNT(*) FROM barang");
};

module.exports = { create, update, remove, getData, countData };
