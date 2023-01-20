const express = require("express");
const router = express.Router();
const authRouter = require("./auth.routes");
const tamuRouter = require("./uang.routes");
const barangRouter = require("./barang.routes");
const profileRouter = require("./profile.routes");

router
  .use("/auth", authRouter)
  .use("/uang", tamuRouter)
  .use("/barang", barangRouter)
  .use("/profile", profileRouter);

module.exports = router;
