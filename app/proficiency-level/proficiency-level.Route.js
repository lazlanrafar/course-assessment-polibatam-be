const { GetProficiencyLevel, CreateProficiencyLevel, GetProficiencyLevelById } = require("./proficiency-level.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetProficiencyLevel);
router.get("/:id", GetProficiencyLevelById);
router.post("/", CreateProficiencyLevel);

module.exports = router;
