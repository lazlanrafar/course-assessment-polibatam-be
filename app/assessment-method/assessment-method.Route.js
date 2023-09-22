const { GetAssessmentMethod, CreateAssessmentMethod, GetAssessmentMethodById } = require("./assessment-method.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetAssessmentMethod);
router.get("/:id", GetAssessmentMethodById);

router.post("/", CreateAssessmentMethod);

module.exports = router;
