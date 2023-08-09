const express = require("express");
const multiparty = require("connect-multiparty");
const postController = require("../controllers/post");
const md_auth = require("../middleware/authenticate");

const md_upload = multiparty({ uploadDir: "./upload/blog" });

const api = express.Router();

api.post("/post", [md_auth.asureAuth, md_upload], postController.createPost);
api.get("/post", postController.getPosts);
api.patch(
    "/post/:id",
    [md_auth.asureAuth, md_upload],
    postController.updatePost,
);
api.delete("/post/:id", [md_auth.asureAuth], postController.deletePost);
api.get("/post/:path", postController.getPost);

module.exports = api;
