const { v4: uuidV4 } = require("uuid");
const { response } = require("../helper/common.helper");
const { create, update, remove, getData } = require("../model/uang.model");

const uangController = {
  createController: (req, res) => {
    const { nama, alamat, jumlah, user_id } = req.body;
    const data = { id: uuidV4(), nama, alamat, jumlah, user_id };
    create(data)
      .then((result) => {
        response(res, result.rows, 200, "Berhasil menambahkan data");
      })
      .catch((error) => res.send(error));
  },
  updateController: (req, res) => {
    const id = req.params.id;
    const { nama, alamat, jumlah } = req.body;
    const data = { id, nama, alamat, jumlah };
    update(data)
      .then((result) => {
        response(res, result.rows, 200, "Edit data berhasil");
      })
      .catch((error) => res.send(error));
  },
  removeController: (req, res) => {
    const id = req.params.id;
    remove(id)
      .then((result) => {
        response(res, result.rows, 200, "Hapus sukses");
      })
      .catch((error) => res.send(error));
  },
  getDataController: (req, res) => {
    const user_id = req.params.user_id;
    const search = req.query.search || "";
    getData({ user_id, search })
      .then((result) => {
        response(res, result.rows, 200, "Get data success");
      })
      .catch((error) => res.send(error));
  },
};

module.exports = uangController;