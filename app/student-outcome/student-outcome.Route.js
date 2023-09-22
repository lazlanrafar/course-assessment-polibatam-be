const { GetStudentOutcome, CreateStudentOutcome, GetStudentOutcomeById } = require("./student-outcome.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetStudentOutcome);
router.get("/:id", GetStudentOutcomeById);

router.post("/", CreateStudentOutcome);

module.exports = router;
