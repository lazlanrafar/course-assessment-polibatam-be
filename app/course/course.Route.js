const {
  CreateCourse,
  GetCourse,
  GetCourseById,
  EditCourse,
  CreateCourseLearningOutcome,
  GetCourseLearningOutcomeById,
} = require("./course.Controller");
const { FormCourseMiddleware, FormCourseLearningOutcomeMiddleware } = require("./course.Middleware");

const express = require("express");
const router = express.Router();

router.get("/", GetCourse);
router.get("/:id", GetCourseById);

router.post("/", FormCourseMiddleware, CreateCourse);
router.put("/:id", FormCourseMiddleware, EditCourse);

router.get("/clo/:id", GetCourseLearningOutcomeById);
router.post("/clo", FormCourseLearningOutcomeMiddleware, CreateCourseLearningOutcome);

module.exports = router;
