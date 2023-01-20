require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mainRouter = require("./src/routes/index.routes");

app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(cors("*"));
app.use("/api/v1", mainRouter);

app.use((err, req, res, next) => {
  if (err) {
    res.status(400).json({ error: err.message });
  } else {
    next();
  }
});

app.listen(5000, () => {
  console.log("server running on port 5000");
});
