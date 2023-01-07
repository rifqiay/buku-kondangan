const express = require("express");
const {
  register,
  login,
  refreshToken,
} = require("../controller/auth.controller");
const router = express.Router();

router
  .post("/register", register)
  .post("/login", login)
  .post("/refresh-token", refreshToken);

module.exports = router;
