const { GetAssessmentMethod } = require("./assessment-method.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetAssessmentMethod);

module.exports = router;
