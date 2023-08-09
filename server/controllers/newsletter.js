const newsletterModel = require("../models/newsletter");

function suscribeEmail(req, res) {
    const { email } = req.body;

    if (!email) {
        res.status(400).send({ msg: "Email es obligatorio" });
    }

    const newsletter = new newsletterModel({
        email: email.toLowerCase(),
    });

    newsletter.save((error) => {
        if (error) {
            res.status(400).send({ msg: "El email ya esta registrado" });
        } else {
            res.status(200).send({ msg: "Se ha registrado el email" });
        }
    });
}

function getEmails(req, res) {
    const { page = 1, limit = 10 } = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };

    newsletterModel.paginate({}, options, (error, emailStored) => {
        if (error) {
            res.stauts(400).send({ msg: "Error al obtener los emails" });
        } else {
            res.status(200).send(emailStored);
        }
    });
}

function deleteEmail(req, res) {
    const { id } = req.params;

    newsletterModel.findByIdAndDelete(id, (error) => {
        if (error) {
            res.status(400).send({ msg: "No se pudo eliminar el registro" });
        } else {
            res.status(200).send({ msg: "Se ha eliminado correctamente" });
        }
    });
}

module.exports = {
    suscribeEmail,
    getEmails,
    deleteEmail,
};
