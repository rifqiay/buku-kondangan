const { edit, editPhoto, getUser } = require("../model/profile");
const { response } = require("../helper/common.helper");
const uploadToCloudinary = require("../middleware/cloudinary");

const profileController = {
  update: async (req, res) => {
    const id = req.params.id;
    const { nama, nomortelepon, kota } = req.body;

    const data = {
      nama,
      nomortelepon,
      kota,
      id,
    };
    edit(data)
      .then((result) => {
        const updatedData = result.rows[0];
        response(res, updatedData, 200, "Edit Success");
      })
      .catch((error) => res.send(error));
  },
  photo: async (req, res) => {
    const id = req.params.id;
    const locaFilePath = req.file.path;
    const {
      rows: [user],
    } = await getUser(id);
    let publicId;
    if (user.photo) {
      publicId = user.photo.split("/").slice(7).join("/");
    }

    const result = await uploadToCloudinary(locaFilePath, publicId);
    const data = {
      id,
      photo: result.url,
    };
    editPhoto(data)
      .then(() => response(res, null, 200, "Edit Photo Berhasil"))
      .catch((error) => res.send(error));
  },
  getProfile: (req, res) => {
    const id = req.params.id;
    getUser(id)
      .then((result) =>
        response(res, result.rows, 200, "get profile succsess", false)
      )
      .catch((error) => res.send(error));
  },
};

module.exports = profileController;
