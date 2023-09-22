const {
  GetStudentOutcomeLevel,
  CreateStudentOutcomeLevel,
  GetStudentOutcomeLevelById,
  EditStudentOutcomeLevel,
} = require("./student-outcome-level.Controller");
const { FormStudentOutcomeLevelMiddleware } = require("./student-outcome-level.Middleware");

const express = require("express");
const router = express.Router();

router.get("/", GetStudentOutcomeLevel);
router.get("/:id", GetStudentOutcomeLevelById);

router.post("/", FormStudentOutcomeLevelMiddleware, CreateStudentOutcomeLevel);

router.put("/:id", FormStudentOutcomeLevelMiddleware, EditStudentOutcomeLevel);

module.exports = router;
