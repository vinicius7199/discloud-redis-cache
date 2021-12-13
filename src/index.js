require("dotenv/config");
const express = require("express");
const discloud = require("./lib/discloud");

const app = express();

app.get("/user", async (req, res) => {
  const result = await discloud.getUser();

  return res.json(result);
});

app.get("/bot", async (req, res) => {
  const params = req.query;

  const result = await discloud.getBot(params);

  return res.json(result);
});

app.listen(process.env.PORT || "3000");
