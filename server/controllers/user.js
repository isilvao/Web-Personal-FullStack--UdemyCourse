const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const image = require("../utils/image");

async function getMe(req, res) {
    const { user_id } = req.user;

    const response = await userModel.findById(user_id);

    if (!response) {
        res.status(400).send({ msg: "No se ha encontrado usuario" });
    } else {
        res.status(200).send(response);
    }
}

async function getUsers(req, res) {
    const { active } = req.query;
    let response = null;

    if (active === undefined) {
        response = await userModel.find();
    } else {
        response = await userModel.find({ active });
    }

    res.status(200).send(response);
}

async function createUser(req, res) {
    const { password } = req.body;
    const user = new userModel({
        ...req.body,
        active: false,
    });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user.password = hashPassword;

    if (req.files.avatar) {
        const imagePath = image.getImagePath(req.files.avatar);
        user.avatar = imagePath;
    }

    // Se guarda desde el usuario ya que es un objeto del modelo userModel.
    user.save((error, userData) => {
        if (error) {
            res.status(400).send({ msg: "Error al crear el usuario" });
        } else {
            res.status(201).send(userData);
        }
    });
}

async function updateUser(req, res) {
    const { id } = req.params;
    const userData = req.body;

    //Password

    if (userData.password) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(userData.password, salt);

        userData.password = hashPassword;
    } else {
        delete userData.password;
    }

    //Avatar

    if (req.files.avatar) {
        const imagePath = image.getImagePath(req.files.avatar);

        userData.avatar = imagePath;
    }

    userModel.findByIdAndUpdate({ _id: id }, userData, (error) => {
        if (error) {
            res.status(400).send({ msg: "Error al actualizar el usuario" });
        } else {
            res.status(200).send({ msg: "Actualizacion realizada" });
        }
    });
}

async function deleteUser(req, res) {
    const { id } = req.params;

    userModel.findByIdAndDelete(id, (error) => {
        if (error) {
            res.status(400).send({ msg: "Error al eliminar el usuario" });
        } else {
            res.status(200).send({ msg: "Usuario eliminado" });
        }
    });
}

module.exports = {
    getMe,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};
