const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

function register(req, res) {
    const { firstname, lastname, email, password } = req.body;

    if (!email) res.status(400).send({ msg: "El email es obligatorio" });
    if (!password) res.status(400).send({ msg: "El password es obligatoria" });

    const user = new UserModel({
        firstname,
        lastname,
        email: email.toLowerCase(),
        role: "user",
        active: false,
        password,
    });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user.password = hashPassword;

    user.save((error, data) => {
        if (error) {
            res.status(400).send({ msg: "Error al crear al usuario" });
        } else {
            res.status(200).send(data);
        }
    });
}

function login(req, res) {
    const { email, password } = req.body;

    if (!email) res.status(400).send({ msg: "El email es obligatorio" });
    if (!password) res.status(400).send({ msg: "El password es obligatoria" });

    const emailLowerCase = email.toLowerCase();

    UserModel.findOne({ email: emailLowerCase }, (error, userData) => {
        if (error) {
            res.status(500).send({ msg: "Error del servidor" });
        } else {
            bcrypt.compare(
                password,
                userData.password,
                (bcryptError, success) => {
                    if (bcryptError) {
                        res.status(500).send({ msg: "Error del servidor" });
                    } else if (!success) {
                        res.status(500).send({
                            msg: "Error al iniciar sesión",
                        });
                    } else if (!userData.active) {
                        res.status(401).send({ msg: "Usuario no activado" });
                    } else {
                        res.status(200).send({
                            access: jwt.createAccessToken(userData),
                            refresh: jwt.createRefreshToken(userData),
                        });
                    }
                },
            );
        }
    });
}

function refreshAccessToken(req, res) {
    const { token } = req.body;

    if (!token) res.status(400).send({ msg: "Token requerido" });

    const { user_id } = jwt.decodeToken(token);

    UserModel.findOne({ _id: user_id }, (error, userData) => {
        if (error) {
            res.status(500).send({ msg: "Error del servidor" });
        } else {
            res.status(200).send({
                accessToken: jwt.createAccessToken(userData),
            });
        }
    });
}

module.exports = {
    register,
    login,
    refreshAccessToken,
};
