const { v4: uuidV4 } = require("uuid");
const { response } = require("../helper/common.helper");
const {
  create,
  update,
  remove,
  getData,
  countData,
} = require("../model/barang.model");

const barangController = {
  createController: (req, res) => {
    const { nama, alamat, barang, user_id } = req.body;
    const data = { id: uuidV4(), nama, alamat, barang, user_id };
    create(data)
      .then((result) => {
        response(res, result.rows, 200, "Berhasil menambahkan data");
      })
      .catch((error) => res.send(error));
  },
  updateController: (req, res) => {
    const idsTamu = req.params.idsTamu;
    const { nama, alamat, barang } = req.body;
    const data = { id: idsTamu, nama, alamat, barang };
    update(data)
      .then((result) => {
        const updatedData = result.rows;
        response(res, updatedData, 200, "Edit Success");
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
  getDataController: async (req, res) => {
    try {
      const user_id = req.params.user_id;
      const search = req.query.search || "";
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "nama";
      const sort = req.query.sort || "ASC";

      const result = await getData({
        user_id,
        search,
        sortby,
        sort,
        limit,
        offset,
      });
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      response(res, result.rows, 200, "Get Data Success", pagination);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = barangController;
