// Importacion y configuracion de express para las peticiones HTTP

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constants");

const app = express();

// Import routes
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const menuRouter = require("./router/menu");
const courseRouter = require("./router/course");
const postRouter = require("./router/post");
const newsletterRouter = require("./router/newsletter");

// Configure Body Parser

app.use(bodyParser.urlencoded({ extended: true })); // Hay que configurar el app antes de configurar las rutas
app.use(bodyParser.json());

// Configure static folder

app.use(express.static("upload"));

// Configure CORS
app.use(cors());

// Configure Routes
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRouter);
app.use(`/api/${API_VERSION}`, courseRouter);
app.use(`/api/${API_VERSION}`, postRouter);
app.use(`/api/${API_VERSION}`, newsletterRouter);

module.exports = app;
