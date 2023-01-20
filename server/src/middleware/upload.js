const multer = require("multer");
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return cb(new Error("Hanya Foto yang diperbolehkan"), false);
  }

  if (file.size > MAX_FILE_SIZE) {
    return cb(new Error("Ukuran Foto Harus Lebih Kecil dari 1 MB"), false);
  }

  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter }).single("photo");

module.exports = { upload };
