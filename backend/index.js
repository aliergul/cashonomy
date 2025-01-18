require("dotenv").config();
const config = require("./config/config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const express = require("express");
const cors = require("cors");
const app = express();

// Routes
const authRoutes = require("./routes/authRoutes");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "hello world" });
});

app.use(authRoutes);

app.listen(8000);

module.exports = app;
