require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mainRouter = require("./src/routes/index.routes");

app.use(express.json());
app.use(cors());
app.use("/api", mainRouter);

app.listen(5000, () => {
  console.log("server running on port 5000");
});
