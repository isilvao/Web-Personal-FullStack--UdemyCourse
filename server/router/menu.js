const express = require("express");
const menuController = require("../controllers/menu");
const md_auth = require("../middleware/authenticate");

const api = express.Router();

api.post("/menu", [md_auth.asureAuth], menuController.createMenu);
api.get("/menus", menuController.getAllMenus);
api.patch("/menu/:id", [md_auth.asureAuth], menuController.updateMenu);
api.delete("/menu/:id", [md_auth.asureAuth], menuController.deleteMenu);

module.exports = api;
