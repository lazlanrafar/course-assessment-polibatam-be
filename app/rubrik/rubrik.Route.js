const { CreateRubrikMiddleware } = require("./rubrik.Middleware");
const { GetRubrik, GetCDIOSyllabus, CreateRubrik, GetRubrikById } = require("./rubrik.Controller");

const express = require("express");
const router = express.Router();

router.get("/cdio-syllabus", GetCDIOSyllabus);

router.get("/", GetRubrik);
router.get("/:id", GetRubrikById);

router.post("/", CreateRubrikMiddleware, CreateRubrik);

module.exports = router;
