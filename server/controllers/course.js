const courseModel = require("../models/course");
const image = require("../utils/image");

function createCourse(req, res) {
    const course = new courseModel(req.body);

    const imagePath = image.getImagePath(req.files.miniature);
    course.miniature = imagePath;

    course.save((error, courseStored) => {
        if (error) {
            res.status(400).send({ msg: "Error al crear el curso" });
        } else {
            res.status(201).send(courseStored);
        }
    });
}

function getAllCourses(req, res) {
    const { page = 1, limit = 10 } = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };

    courseModel.paginate({}, options, (error, courses) => {
        if (error) {
            res.status(400).send({ msg: "Error al obtener los cursos" });
        } else {
            res.status(200).send(courses);
        }
    });
}

function updateCourse(req, res) {
    const { id } = req.params;
    const courseData = req.body;

    if (req.files.miniature) {
        const imagePath = image.getImagePath(req.files.miniature);
        courseData.miniature = imagePath;
    } else {
        delete courseData.miniature;
    }

    courseModel.findByIdAndUpdate({ _id: id }, courseData, (error) => {
        if (error) {
            res.status(400).send({
                msg: "No se ha podido actualizar el curso",
            });
        } else {
            res.status(200).send({ msg: "Actualizacion realizada" });
        }
    });
}

function deleteCourse(req, res) {
    const { id } = req.params;

    courseModel.findByIdAndDelete({ _id: id }, (error) => {
        if (error) {
            res.status(400).send({
                msg: "Ocurrio un error al eliminar el curso",
            });
        } else {
            res.status(200).send({ msg: "Curso eliminado correctamente" });
        }
    });
}

module.exports = {
    createCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
};
