const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

//const ciRoutes = require("./routes/ci.routes");
// app.use("/api/cis", ciRoutes);

module.exports = app;
