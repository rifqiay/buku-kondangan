const express = require("express");
const {
  createController,
  updateController,
  removeController,
  getDataController,
} = require("../controller/barang.controller");
const router = express.Router();

router
  .post("/create", createController)
  .put("/edit/:idsTamu", updateController)
  .delete("/delete/:id", removeController)
  .get("/:user_id", getDataController);

module.exports = router;
