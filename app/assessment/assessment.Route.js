const { CreateAssessment } = require("./assessment.Controller");

const express = require("express");
const router = express.Router();

router.post("/", CreateAssessment);

module.exports = router;
