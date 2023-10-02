const {
  CreateCourse,
  GetCourse,
  GetCourseById,
  EditCourse,
  CreateCourseLearningOutcome,
  GetCourseLearningOutcomeById,
  EditCourseLearningOutcome,
  DeleteCourseLearningOutcome,
  GetPerformanceIndicator,
  GenerateCourseAssessmentPlan,
  GetCourseAssessmentPlanByIdCourse,
} = require("./course.Controller");
const { FormCourseMiddleware, FormCourseLearningOutcomeMiddleware } = require("./course.Middleware");

const express = require("express");
const router = express.Router();

// COURSE
router.get("/", GetCourse);
router.get("/:id", GetCourseById);
router.post("/", FormCourseMiddleware, CreateCourse);
router.put("/:id", FormCourseMiddleware, EditCourse);

// COURSE LEARNING OUTCOME
router.get("/clo/:id", GetCourseLearningOutcomeById);
router.post("/clo", FormCourseLearningOutcomeMiddleware, CreateCourseLearningOutcome);
router.put("/clo/:id", FormCourseLearningOutcomeMiddleware, EditCourseLearningOutcome);
router.delete("/clo/:id", DeleteCourseLearningOutcome);

router.get("/performance-indicator/:id", GetPerformanceIndicator);

// COURSE ASSESSMENT PLAN
router.get("/assessment-plan/:id", GetCourseAssessmentPlanByIdCourse);
router.post("/assessment-plan/:id", GenerateCourseAssessmentPlan);

module.exports = router;
