const express = require("express");
const multiparty = require("connect-multiparty");
const courseController = require("../controllers/course");
const md_auth = require("../middleware/authenticate");

const md_upload = multiparty({ uploadDir: "upload/course" });
const api = express.Router();

api.post(
    "/course",
    [md_auth.asureAuth, md_upload],
    courseController.createCourse,
);
api.get("/courses", courseController.getAllCourses);
api.patch(
    "/course/:id",
    [md_auth.asureAuth, md_upload],
    courseController.updateCourse,
);
api.delete("/course/:id", [md_auth.asureAuth], courseController.deleteCourse);

module.exports = api;
