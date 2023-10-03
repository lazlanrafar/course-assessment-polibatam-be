const { CreateAssessment, GetAssessment } = require("./assessment.Controller");
const { FormAssessmentMiddleware } = require("./assessment.Middleware");

const express = require("express");
const router = express.Router();

router.get("/", GetAssessment);
router.post("/", FormAssessmentMiddleware, CreateAssessment);

module.exports = router;
