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
  GetCourseAssessmentPlanById,
  EditCourseAssessmentPlan,
  GetCourseReady,
} = require("./course.Controller");
const { FormCourseMiddleware, FormCourseLearningOutcomeMiddleware } = require("./course.Middleware");

const express = require("express");
const router = express.Router();

// FETCH FOR LIST PURPOSE ONLY
router.get("/list", GetCourseReady);

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
router.get("/assessment-plan/detail/:id", GetCourseAssessmentPlanById);
router.post("/assessment-plan/:id", GenerateCourseAssessmentPlan);
router.put("/assessment-plan/:id", EditCourseAssessmentPlan);

module.exports = router;
