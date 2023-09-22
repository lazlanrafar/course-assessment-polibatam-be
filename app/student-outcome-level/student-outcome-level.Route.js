const { GetStudentOutcomeLevel } = require("./student-outcome-level.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetStudentOutcomeLevel);

module.exports = router;
