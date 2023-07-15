const express = require("express");
const authController = require("../controllers/auth");
const bodyParser = require("body-parser");

const api = express.Router();

api.post("/auth/register", bodyParser.json(), authController.register);

module.exports = api;
