const { GetRubrik, GetCDIOSyllabus } = require("./rubrik.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetRubrik);
router.get("/cdio-syllabus", GetCDIOSyllabus);

module.exports = router;
