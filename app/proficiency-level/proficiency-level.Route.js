const { GetProficiencyLevel, CreateProficiencyLevel } = require("./proficiency-level.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetProficiencyLevel);
router.post("/", CreateProficiencyLevel);

module.exports = router;
