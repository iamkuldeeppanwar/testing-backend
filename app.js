const express = require("express");
const config = require("dotenv");
// require("./config/database");
const cors = require("cors");

config.config({
  path: "./config/.env",
});

const app = express();

app.use(express.json());
app.use(cors());

const userRouter = require("./routes/user.router");

app.use("/api/user", userRouter);

module.exports = app;
