const { CreateCourse } = require("./course.Controller");
const { FormCourseMiddleware } = require("./course.Middleware");

const express = require("express");
const router = express.Router();

router.post("/", FormCourseMiddleware, CreateCourse);

module.exports = router;
