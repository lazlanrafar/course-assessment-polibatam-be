const { GetAssessmentMethod, CreateAssessmentMethod } = require("./assessment-method.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetAssessmentMethod);

router.post("/", CreateAssessmentMethod);

module.exports = router;
