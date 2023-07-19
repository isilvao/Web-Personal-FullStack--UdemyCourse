const express = require("express");
const authController = require("../controllers/auth");
const bodyParser = require("body-parser");

const api = express.Router();

api.post("/auth/register", bodyParser.json(), authController.register);
api.post("/auth/login", bodyParser.json(), authController.login);
api.post("/auth/refresh_access_token", authController.refreshAccessToken);

module.exports = api;
