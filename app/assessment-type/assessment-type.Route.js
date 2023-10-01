const { GetAssessmentType } = require("./assessment-type.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetAssessmentType);

module.exports = router;
