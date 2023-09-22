const { GetStudentOutcomeLevel, CreateStudentOutcomeLevel } = require("./student-outcome-level.Controller");
const { FormStudentOutcomeLevelMiddleware } = require("./student-outcome-level.Middleware");

const express = require("express");
const router = express.Router();

router.get("/", GetStudentOutcomeLevel);

router.post("/", FormStudentOutcomeLevelMiddleware, CreateStudentOutcomeLevel);

module.exports = router;
