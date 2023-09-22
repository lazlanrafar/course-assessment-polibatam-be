const {
  GetAssessmentMethod,
  CreateAssessmentMethod,
  GetAssessmentMethodById,
  EditAssessmentMethod,
} = require("./assessment-method.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetAssessmentMethod);
router.get("/:id", GetAssessmentMethodById);

router.post("/", CreateAssessmentMethod);

router.put("/:id", EditAssessmentMethod);

module.exports = router;
