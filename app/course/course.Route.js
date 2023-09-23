const { CreateCourse, GetCourse, GetCourseById } = require("./course.Controller");
const { FormCourseMiddleware } = require("./course.Middleware");

const express = require("express");
const router = express.Router();

router.get("/", GetCourse);
router.get("/:id", GetCourseById);

router.post("/", FormCourseMiddleware, CreateCourse);

module.exports = router;
