const axios = require("axios");

const api = axios.create({
  baseURL: "https://discloud.app/status",
  headers: {
    "api-token": process.env.DISCLOUD_TOKEN,
  },
});

module.exports = api;
