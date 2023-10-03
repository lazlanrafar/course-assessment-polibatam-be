const { CreateAssessment, GetAssessment, GetAssessmentById } = require("./assessment.Controller");
const { FormAssessmentMiddleware } = require("./assessment.Middleware");

const express = require("express");
const router = express.Router();

router.get("/", GetAssessment);
router.get("/:id", GetAssessmentById);
router.post("/", FormAssessmentMiddleware, CreateAssessment);

module.exports = router;
