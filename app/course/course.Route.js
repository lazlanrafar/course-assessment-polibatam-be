const { CreateCourse, GetCourse } = require("./course.Controller");
const { FormCourseMiddleware } = require("./course.Middleware");

const express = require("express");
const router = express.Router();

router.get("/", GetCourse);
router.post("/", FormCourseMiddleware, CreateCourse);

module.exports = router;
