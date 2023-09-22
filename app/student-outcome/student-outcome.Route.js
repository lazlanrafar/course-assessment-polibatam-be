const { GetStudentOutcome } = require("./student-outcome.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetStudentOutcome);

module.exports = router;
