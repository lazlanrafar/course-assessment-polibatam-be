const {
  GetStudentOutcome,
  CreateStudentOutcome,
  GetStudentOutcomeById,
  EditStudentOutcome,
  DeleteStudentOutcome,
} = require("./student-outcome.Controller");
const { FormStudentOutcomeMiddleware, CheckIsStudentOutcomeWasUsed } = require("./student-outcome.Middleware");

const express = require("express");
const router = express.Router();

router.get("/", GetStudentOutcome);
router.get("/:id", GetStudentOutcomeById);
router.post("/", FormStudentOutcomeMiddleware, CreateStudentOutcome);
router.put("/:id", FormStudentOutcomeMiddleware, EditStudentOutcome);
router.delete("/:id", CheckIsStudentOutcomeWasUsed, DeleteStudentOutcome);

module.exports = router;
