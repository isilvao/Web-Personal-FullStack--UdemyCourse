const menuModel = require("../models/menu");

async function createMenu(req, res) {
    const menu = new menuModel(req.body);

    menu.save((error, menuStored) => {
        if (error) {
            res.status(400).send({ msg: "Error al crear el menu" });
        } else {
            res.status(200).send(menuStored);
        }
    });
}

async function getAllMenus(req, res) {
    const { active } = req.query;

    let response = null;

    if (active === undefined) {
        response = await menuModel.find().sort({ order: "asc" });
    } else {
        response = await menuModel.find({ active }).sort({ order: "asc" });
    }

    if (!response) {
        res.status(400).send({ msg: "No se encontraron menus" });
    } else {
        res.status(200).send(response);
    }
}

async function updateMenu(req, res) {
    const { id } = req.params;
    const menuData = req.body;

    menuModel.findByIdAndUpdate({ _id: id }, menuData, (error) => {
        if (error) {
            res.status(400).send({ msg: "No se pudo actualizar el menu" });
        } else {
            res.status(200).send({ msg: "Menu actualizado correctamente" });
        }
    });
}

async function deleteMenu(req, res) {
    const { id } = req.params;

    menuModel.findByIdAndDelete({ _id: id }, (error) => {
        if (error) {
            res.status(400).send({ msg: "Error al eliminar usuario" });
        } else {
            res.status(200).send({ msg: "Menu eliminado correctamente" });
        }
    });
}

module.exports = {
    createMenu,
    getAllMenus,
    updateMenu,
    deleteMenu,
};
