const { CreateRubrikMiddleware } = require("./rubrik.Middleware");
const { GetRubrik, GetCDIOSyllabus, CreateRubrik } = require("./rubrik.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetRubrik);
router.get("/cdio-syllabus", GetCDIOSyllabus);

router.post("/", CreateRubrikMiddleware, CreateRubrik);

module.exports = router;
