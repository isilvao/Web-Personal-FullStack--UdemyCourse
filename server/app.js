// Importacion y configuracion de express para las peticiones HTTP

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constants");

const app = express();

// Import routes
const authRoutes = require("./router/auth");

// Configure Routes
app.use(`/api/${API_VERSION}`, authRoutes);

// Configure Body Parser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure static folder

app.use(express.static("uploads"));

// Configure CORS
app.use(cors());

module.exports = app;
