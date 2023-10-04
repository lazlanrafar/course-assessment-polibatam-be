const {
  CreateAssessment,
  GetAssessment,
  GetAssessmentById,
  EditAssessment,
  DeleteAssessment,
  CreateAssessmentDetail,
} = require("./assessment.Controller");
const { FormAssessmentMiddleware, FormAssessmentDetailMiddleware } = require("./assessment.Middleware");

const express = require("express");
const router = express.Router();

router.get("/", GetAssessment);
router.get("/:id", GetAssessmentById);
router.post("/", FormAssessmentMiddleware, CreateAssessment);
router.put("/:id", FormAssessmentMiddleware, EditAssessment);
router.delete("/:id", DeleteAssessment);

router.post("/detail", FormAssessmentDetailMiddleware, CreateAssessmentDetail);

module.exports = router;
