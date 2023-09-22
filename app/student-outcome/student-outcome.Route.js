const {
  GetStudentOutcome,
  CreateStudentOutcome,
  GetStudentOutcomeById,
  EditStudentOutcome,
} = require("./student-outcome.Controller");
const { FormStudentOutcomeMiddleware } = require("./student-outcome.Middleware");

const express = require("express");
const router = express.Router();

router.get("/", GetStudentOutcome);
router.get("/:id", GetStudentOutcomeById);

router.post("/", FormStudentOutcomeMiddleware, CreateStudentOutcome);

router.put("/:id", FormStudentOutcomeMiddleware, EditStudentOutcome);

module.exports = router;
