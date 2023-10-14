const {
  CreateAssessment,
  GetAssessment,
  GetAssessmentById,
  EditAssessment,
  DeleteAssessment,
  CreateAssessmentDetail,
  GetAssessmentDetailById,
  EditAssessmentDetail,
  DeleteAssessmentDetail,
  ImportAssessmentDetail,
  GetAssessmentStep5,
  GetAssessmentStep6,
  GetAssessmentStep7,
  GetAssessmentStep8,
  GetAssessmentStep9,
} = require("./assessment.Controller");
const {
  FormAssessmentMiddleware,
  FormAssessmentDetailMiddleware,
  FormImportAssessmentDetailMiddleware,
} = require("./assessment.Middleware");

const express = require("express");
const router = express.Router();

router.get("/", GetAssessment);
router.get("/:id", GetAssessmentById);
router.post("/", FormAssessmentMiddleware, CreateAssessment);
router.put("/:id", FormAssessmentMiddleware, EditAssessment);
router.delete("/:id", DeleteAssessment);

router.get("/detail/:id", GetAssessmentDetailById);
router.post("/detail", FormAssessmentDetailMiddleware, CreateAssessmentDetail);
router.post("/detail/import/:id_assessment", FormImportAssessmentDetailMiddleware, ImportAssessmentDetail);
router.put("/detail/:id", FormAssessmentDetailMiddleware, EditAssessmentDetail);
router.delete("/detail/:id", DeleteAssessmentDetail);

// ==========================================================================================
// ASSESSMENT RESULT
// ==========================================================================================

router.get("/percentage-of-students-within-each-category/:id", GetAssessmentStep5);
router.get("/student-proficiency-level-attainment-for-each-assessment-tool/:id", GetAssessmentStep6);
router.get("/percentage-of-student-within-each-proficiency-level/:id", GetAssessmentStep7);
router.get("/attainment-of-each-performance-indicator/:id", GetAssessmentStep8);
router.get("/summary-of-course-assessment-results/:id", GetAssessmentStep9);

module.exports = router;
