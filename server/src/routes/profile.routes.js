const express = require("express");
const router = express.Router();
const { update, photo, getProfile } = require("../controller/profile");
const { upload } = require("../middleware/upload");

router
  .put("/edit/:id", update)
  .put("/photo/:id", upload, photo)
  .get("/:id", getProfile);

module.exports = router;
