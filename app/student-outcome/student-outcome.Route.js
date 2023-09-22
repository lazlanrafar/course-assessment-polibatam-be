const { GetStudentOutcome, CreateStudentOutcome } = require("./student-outcome.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetStudentOutcome);
router.post("/", CreateStudentOutcome);

module.exports = router;
