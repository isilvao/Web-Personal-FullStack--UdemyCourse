// Importacion y configuracion de express para las peticiones HTTP

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constants");

const app = express();

// Import routes
const authRoutes = require("./router/auth");

// Configure Body Parser

app.use(bodyParser.urlencoded({ extended: true })); // Hay que configurar el app antes de configurar las rutas
app.use(bodyParser.json());

// Configure Routes
app.use(`/api/${API_VERSION}`, authRoutes);

// Configure static folder

app.use(express.static("uploads"));

// Configure CORS
app.use(cors());

module.exports = app;
