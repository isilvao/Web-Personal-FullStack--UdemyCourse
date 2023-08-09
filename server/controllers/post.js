const postModel = require("../models/post");
const image = require("../utils/image");

function createPost(req, res) {
    const post = new postModel(req.body);

    post.created_at = new Date();

    const imagePath = image.getImagePath(req.files.miniature);
    post.miniature = imagePath;

    post.save((error, postStored) => {
        if (error) {
            res.status(400).send({ msg: "Error al crear el post" });
        } else {
            res.status(200).send(postStored);
        }
    });
}

function getPosts(req, res) {
    const { page = 1, limit = 10 } = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { created_at: "desc" },
    };

    postModel.paginate({}, options, (error, postStored) => {
        if (error) {
            res.status(400).send({ msg: "Error al obtener los posts" });
        } else {
            res.status(200).send(postStored);
        }
    });
}

function updatePost(req, res) {
    const { id } = req.params;
    const postData = req.body;

    if (req.files.miniature) {
        const imagePath = image.getImagePath(req.files.miniature);
        postData.miniature = imagePath;
    }

    postModel.findByIdAndUpdate({ _id: id }, postData, (error) => {
        if (error) {
            res.status(400).send({ msg: "Error al actualizar el post" });
        } else {
            res.status(200).send(postData);
        }
    });
}

function deletePost(req, res) {
    const { id } = req.params;
    postModel.findByIdAndDelete({ _id: id }, (error) => {
        if (error) {
            res.status(400).send({ msg: "No se pudo eliminar el post" });
        } else {
            res.status(200).send({ msg: "Se ha eliminado correctamente" });
        }
    });
}

function getPost(req, res) {
    const { path } = req.params;

    postModel.findOne({ path }, (error, postStored) => {
        if (error) {
            res.status(500).send({ msg: "Error del servidor" });
        } else if (!postStored) {
            res.status(400).send({ msg: "No se ha encontrado ningun post" });
        } else {
            res.status(200).send(postStored);
        }
    });
}

module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    getPost,
};
