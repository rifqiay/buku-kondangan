const { v4: uuidV4 } = require("uuid");
const bcrypt = require("bcryptjs");
const { create, findEmail } = require("../model/auth.model");
const { response } = require("../helper/common.helper");
const {
  generateToken,
  generateRefershToken,
} = require("../helper/auth.helper");
const jwt = require("jsonwebtoken");

const authController = {
  register: async (req, res) => {
    try {
      const { nama, email, password } = req.body;
      const { rowCount } = await findEmail(email);
      if (rowCount) throw response(res, null, 403, "Email telah digunakan");
      const passwordHash = bcrypt.hashSync(password);
      const data = {
        id: uuidV4(),
        nama,
        email,
        passwordHash,
      };
      const result = await create(data);
      response(res, result.rows, 200, "Register berhasil");
    } catch (error) {
      res.send(error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const {
        rows: [user],
      } = await findEmail(email);
      if (!user) throw response(res, null, 403, "Email salah");
      const isPassword = bcrypt.compareSync(password, user.password);
      if (!isPassword) throw response(res, null, 403, "Password salah");
      delete user.password;
      const payload = {
        id: user.id,
      };
      user.token = generateToken(payload);
      user.refreshToken = generateRefershToken(payload);
      response(res, user, 200, "Login berhasil");
    } catch (error) {
      console.log(error);
    }
  },
  refreshToken: (req, res) => {
    try {
      const refreshToken = req.body.refreshToken;
      const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);

      const payload = {
        id: decoded.id,
      };
      const result = {
        token: generateToken(payload),
        refreshToken: generateRefershToken(payload),
      };
      response(res, result, 200);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(400).json(error.message);
      }
    }
  },
};

module.exports = authController;
