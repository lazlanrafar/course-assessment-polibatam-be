const { CreateCourse, GetCourse, GetCourseById, EditCourse } = require("./course.Controller");
const { FormCourseMiddleware } = require("./course.Middleware");

const express = require("express");
const router = express.Router();

router.get("/", GetCourse);
router.get("/:id", GetCourseById);

router.post("/", FormCourseMiddleware, CreateCourse);

router.put("/:id", FormCourseMiddleware, EditCourse);

module.exports = router;
